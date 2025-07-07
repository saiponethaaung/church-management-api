import { Prisma } from '.prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable, Scope } from '@nestjs/common';
import { Readable } from 'stream';

interface DelegateFunctions {
  // @ts-ignore
  findFirst(any);
  // @ts-ignore
  findUnique(any);
  // @ts-ignore
  findMany(any);
  // @ts-ignore
  create(any);
  // @ts-ignore
  createMany(any);
  // @ts-ignore
  update(any);
  // @ts-ignore
  updateMany(any);
  // @ts-ignore
  count(any);
  // @ts-ignore
  delete(any);
  // @ts-ignore
  deleteMany(any);
  // @ts-ignore
  stream(any);
}
@Injectable({ scope: Scope.REQUEST }) // Make BaseRepo request-scoped
export abstract class BaseRepo<
  T,
  ModelDelegate extends Partial<DelegateFunctions>,
> {
  protected prisma: PrismaService;
  // Default page limit
  protected limit: number = 10;

  // Logging
  protected logEnabled: boolean = false;
  protected entityType: string = '';
  protected entityField: string = 'id';

  constructor(
    private modelName: Prisma.ModelName,
    protected softDelete: boolean = false,
  ) {}

  // @ts-ignore
  private softDeleteCheck(args) {
    if (!args.where) {
      args.where = {};
    }

    args.where.deletedAt = null;
  }

  get model(): ModelDelegate {
    // @ts-ignore
    return this.prisma[
      this.modelName[0].toLowerCase() + this.modelName.slice(1)
    ];
  }

  findOne<A extends Prisma.Args<T, 'findFirst'>>(
    args: A,
    includeSoftDelete = false,
  ): Prisma.Result<T, A, 'findFirst'> {
    if (this.softDelete && !includeSoftDelete) {
      this.softDeleteCheck(args);
    }

    return this.model.findFirst(args);
  }

  find<A extends Prisma.Args<T, 'findMany'>>(
    args: A,
    includeSoftDelete = false,
  ): Prisma.Result<T, A, 'findMany'> {
    if (this.softDelete && !includeSoftDelete) {
      this.softDeleteCheck(args);
    }

    return this.model.findMany(args);
  }

  stream<A extends Prisma.Args<T, 'findMany'>>(
    batchSize: number = 100,
    args: A,
    includeSoftDelete = false,
  ): Readable {
    // log inside the stream is for active debugging so please don't remove it :D
    // if no longer needed simply comment it out :P
    if (this.softDelete && !includeSoftDelete) {
      this.softDeleteCheck(args);
    }

    const model = this.model;
    let cursorId: undefined | string = undefined;

    if (!args.orderBy) {
      args.orderBy = { createdAt: 'asc' };
    }

    return new Readable({
      objectMode: true,
      async read() {
        // console.log('stream start', args);
        try {
          // console.log('reading...', cursorId);
          let items;
          const { skip, ...argu } = args;

          if (skip && !cursorId) {
            items = await model.findMany({ skip, take: batchSize, ...argu });
          } else {
            items = await model.findMany({
              cursor: cursorId ? { id: cursorId } : undefined,
              skip: cursorId ? 1 : 0,
              take: batchSize,
              ...argu,
            });
          }

          if (items.length === 0) {
            this.push(null);
          } else {
            this.push(items);
            cursorId = items[items.length - 1].id;
          }
        } catch (err) {
          this.destroy(err);
        }
      },
    });
  }

  async paginate<A extends Prisma.Args<T, 'findMany'>>(
    args: A,
    includeSoftDelete = false,
  ): Promise<{
    data: Prisma.Result<T, A, 'findMany'>;
    pagination: {
      totalCount: number;
      totalPage: number;
      currentPage: number;
      limit: number;
    };
  }> {
    if (!args.take) {
      args.take = this.limit;
    }

    if (!args.skip) {
      args.skip = 0;
    }

    const data = await this.find(args, includeSoftDelete);
    const total = await this.count(
      { where: args.where } as Prisma.Args<T, 'count'>,
      includeSoftDelete,
    );

    return {
      data,
      pagination: {
        totalCount: total as number,
        totalPage: Math.ceil((total as number) / args.take),
        currentPage: args.skip === 0 ? 1 : args.skip / args.take + 1,
        limit: args.take,
      },
    };
  }

  create<A extends Prisma.Args<T, 'create'>>(
    input: A,
  ): Prisma.Result<T, A, 'create'> {
    return this.model.create(input);
  }

  createMany<A extends Prisma.Args<T, 'createMany'>>(
    args: A,
  ): Prisma.Result<T, A, 'createMany'> {
    return this.model.createMany(args);
  }

  update<A extends Prisma.Args<T, 'update'>>(
    args: A,
  ): Prisma.Result<T, A, 'update'> {
    return this.model.update(args);
  }

  updateMany<A extends Prisma.Args<T, 'updateMany'>>(
    args: A,
  ): Prisma.Result<T, A, 'updateMany'> {
    return this.model.updateMany(args);
  }

  count<A extends Prisma.Args<T, 'count'>>(
    args: A,
    includeSoftDelete = false,
  ): Prisma.Result<T, A, 'count'> {
    if (this.softDelete && !includeSoftDelete) {
      this.softDeleteCheck(args);
    }

    return this.model.count(args);
  }

  // This function is for deleting single record only
  async delete(id: string): Promise<any> {
    const args = { where: { id } };

    let data = await this.model.findFirst(args);

    if (!data) {
      return true;
    }

    if (this.softDelete && !data.deleteAt) {
      data = this.model.update({
        where: args.where,
        data: { deletedAt: new Date().toISOString() },
      });
      return data;
    }

    return this.model.delete(args);
  }

  deleteMany(args: Prisma.Args<T, 'deleteMany'>): Promise<number> {
    return this.model.deleteMany(args);
  }

  protected rawQuery<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<any> {
    return this.prisma.$queryRaw(query, ...values);
  }

  protected executeRawQuery(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<any> {
    return this.prisma.$executeRaw(query, ...values);
  }

  protected queryRawUnsafe(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<any> {
    return this.prisma.$queryRawUnsafe(query, ...values);
  }

  mysqlEscapeString(str: string) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
      switch (char) {
        case '\0':
          return '\\0';
        case '\x08':
          return '\\b';
        case '\x09':
          return '\\t';
        case '\x1a':
          return '\\z';
        case '\n':
          return '\\n';
        case '\r':
          return '\\r';
        case '"':
        case "'":
        case '\\':
        case '%':
          return '\\' + char; // prepends a backslash to backslash, percent,
        // and double/single quotes
        default:
          return char;
      }
    });
  }
}
