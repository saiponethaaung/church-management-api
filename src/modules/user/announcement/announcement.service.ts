import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AnnouncementRepo } from 'src/libs/prisma/repo/announcement.repo';
import { CreateAnnouncementRequest } from './dto/request/create-announcement.request';
import { UpdateAnnouncementRequest } from './dto/request/update-announcement.request';
import { GetAnnouncementsRequest } from './dto/request/get-announcements.request';
import { AnnouncementResponse } from './dto/response/announcement.response';
import { AnnouncementPaginationResponse } from './dto/response/announcement-pagination.response';
import { ServiceResponse } from 'src/interfaces/response.interface';
import { MessageResponse } from 'src/dto/response/message.response';
import { PaginationResponse } from 'src/dto/response/pagination.response';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class AnnouncementService {
  constructor(
    private readonly repo: AnnouncementRepo,
    private readonly prisma: PrismaService,
  ) {}

  async createAnnouncement(
    user: User,
    dto: CreateAnnouncementRequest,
  ): Promise<ServiceResponse<AnnouncementResponse>> {
    const { message, churchId, programId, ...data } = dto;
    
    const announcement = await this.repo.create({
      data: {
        ...(data as any),
        message: message ? JSON.parse(message) : null,
        church: { connect: { id: churchId } },
        program: { connect: { id: programId } },
        createdByUser: { connect: { id: user.id } },
        updatedByUser: { connect: { id: user.id } },
      },
    });

    return { status: true, code: 201, result: new AnnouncementResponse(announcement) };
  }

  async updateAnnouncement(
    user: User,
    dto: UpdateAnnouncementRequest,
  ): Promise<ServiceResponse<AnnouncementResponse>> {
    const { id, message, ...data } = dto;
    
    const updateData: any = {
      ...data,
      updatedByUser: { connect: { id: user.id } },
    };

    if (message !== undefined) {
      updateData.message = message ? JSON.parse(message) : null;
    }

    const announcement = await this.repo.update({
      where: { id },
      data: updateData,
    });

    return { status: true, code: 200, result: new AnnouncementResponse(announcement) };
  }

  async deleteAnnouncement(id: string): Promise<ServiceResponse<MessageResponse>> {
    await this.repo.delete(id);
    return {
      status: true,
      code: 200,
      result: { message: 'Announcement deleted successfully' },
    };
  }

  async getAnnouncement(id: string): Promise<ServiceResponse<AnnouncementResponse>> {
    const announcement = await this.repo.findOne({
      where: { id },
    });
    if (!announcement) {
      return { status: false, code: 404, error: { message: 'Announcement not found', errorCode: '404' } };
    }
    return { status: true, code: 200, result: new AnnouncementResponse(announcement) };
  }

  async getAnnouncements(
    dto: GetAnnouncementsRequest,
  ): Promise<ServiceResponse<AnnouncementPaginationResponse>> {
    const { churchId, programId, limit, page } = dto;
    
    const where: any = { churchId };
    if (programId) {
      where.programId = programId;
    }

    const { data, pagination } = await this.repo.paginate({
      where,
      take: limit,
      skip: page === 1 ? 0 : (page - 1) * limit,
      orderBy: { createdAt: 'desc' } as any,
    });

    return {
      status: true,
      code: 200,
      result: {
        data: data.map((a) => new AnnouncementResponse(a)),
        pagination: new PaginationResponse(pagination),
      },
    };
  }
}
