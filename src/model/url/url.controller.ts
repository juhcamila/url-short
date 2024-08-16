import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, Redirect } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller('/')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post("url")
  async create(@Body(new ValidationPipe()) createUrlDto: CreateUrlDto) {
    return await this.urlService.create(createUrlDto.link);
  }

  @Get(':hash')
  @Redirect(process.env.HOSTNAME_PATH, 302)
  async findAll(@Param('hash') hash: string) {
    return await this.urlService.find(hash);
  }
}
