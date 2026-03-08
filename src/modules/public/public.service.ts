import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../libs/prisma/prisma.service';

@Injectable()
export class PublicService {
  constructor(private prisma: PrismaService) {}

  async getPublicFeed() {
    // In the future this will aggregate announcements, events, and programs.
    // We return a simple struct for now to validate connectivity and caching headers.
    return {
      message: 'Welcome to My Church',
      announcements: [],
      upcomingEvents: [],
      timestamp: new Date().toISOString()
    }
  }

  async getChurches(search?: string, page = 1) {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const where = search
      ? { name: { contains: search, mode: 'insensitive' as const } }
      : {};

    const [churches, total] = await Promise.all([
      this.prisma.church.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          country: true,
          _count: {
            select: {
              programs: true,
              churchMembers: true,
            },
          },
        },
      }),
      this.prisma.church.count({ where }),
    ]);

    const now = new Date();

    const result = churches.map((church) => {
      // Derive a simple status from the church data
      const hasPrograms = church._count.programs > 0;
      return {
        id: church.id,
        name: church.name,
        logo: church.logo,
        verified: church.verified,
        address: church.address,
        country: church.country
          ? { name: church.country.name, code: church.country.code }
          : null,
        memberCount: church._count.churchMembers,
        programCount: church._count.programs,
        hasActivePrograms: hasPrograms,
        createdAt: church.createdAt,
      };
    });

    return {
      churches: result,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async getChurchById(id: string) {
    const church = await this.prisma.church.findUnique({
      where: { id },
      include: {
        country: true,
        programs: {
          where: { status: true },
          include: {
            programType: true,
            leader: { select: { name: true, image: true } },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        announcements: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            program: { select: { name: true } },
          },
        },
        _count: {
          select: {
            churchMembers: true,
            programs: true,
            donations: true,
          },
        },
      },
    });

    if (!church) {
      return null;
    }

    return {
      id: church.id,
      name: church.name,
      logo: church.logo,
      verified: church.verified,
      address: church.address,
      country: church.country
        ? { name: church.country.name, code: church.country.code }
        : null,
      memberCount: church._count.churchMembers,
      programCount: church._count.programs,
      donationCount: church._count.donations,
      createdAt: church.createdAt,
      programs: church.programs.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        mode: p.mode,
        isFeatured: p.isFeatured,
        isRecurring: p.isRecurring,
        recurrence: p.recurrence,
        startDate: p.startDate,
        endDate: p.endDate,
        type: p.programType ? { name: p.programType.name } : null,
        leader: p.leader ? { name: p.leader.name, image: p.leader.image } : null,
      })),
      announcements: church.announcements.map((a) => ({
        id: a.id,
        name: a.name,
        message: a.message,
        program: a.program ? { name: a.program.name } : null,
        createdAt: a.createdAt,
      })),
    };
  }

  async getProgramById(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id },
      include: {
        programType: true,
        leader: { select: { name: true, image: true } },
        church: { select: { id: true, name: true, logo: true } },
        programAnnouncements: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        plans: {
          where: { status: true },
          orderBy: { date: 'asc' },
          take: 20,
          include: {
            attachments: true,
          },
        },
      },
    });

    if (!program) {
      return null;
    }

    return {
      id: program.id,
      name: program.name,
      description: program.description,
      mode: program.mode,
      isFeatured: program.isFeatured,
      isRecurring: program.isRecurring,
      recurrence: program.recurrence,
      startDate: program.startDate,
      endDate: program.endDate,
      status: program.status,
      createdAt: program.createdAt,
      type: program.programType ? { name: program.programType.name } : null,
      leader: program.leader
        ? { name: program.leader.name, image: program.leader.image }
        : null,
      church: {
        id: program.church.id,
        name: program.church.name,
        logo: program.church.logo,
      },
      announcements: program.programAnnouncements.map((a) => ({
        id: a.id,
        name: a.name,
        message: a.message,
        createdAt: a.createdAt,
      })),
      plans: program.plans.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        date: p.date,
        content: p.content,
        attachments: p.attachments.map((att) => ({
          id: att.id,
          url: att.url,
          name: att.name,
          type: att.type,
        })),
      })),
    };
  }
}
