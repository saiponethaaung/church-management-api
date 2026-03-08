import { Controller, Get, Header, Param, Query } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('feed')
  // @Header('Cache-Control', 'public, max-age=604800') // Cached for 1 week
  async getPublicFeed() {
    return this.publicService.getPublicFeed();
  }

  @Get('churches')
  // @Header('Cache-Control', 'public, max-age=300') // Cached for 5 minutes
  async getChurches(
    @Query('search') search?: string,
    @Query('page') page?: string,
  ) {
    return this.publicService.getChurches(search, page ? parseInt(page, 10) : 1);
  }

  @Get('churches/:id')
  // @Header('Cache-Control', 'public, max-age=300')
  async getChurchById(@Param('id') id: string) {
    return this.publicService.getChurchById(id);
  }

  @Get('programs/:id')
  async getProgramById(@Param('id') id: string) {
    return this.publicService.getProgramById(id);
  }
}
