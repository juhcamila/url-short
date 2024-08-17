import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Redirect, Req } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UserDto } from '../user/dto/user.dto';
import { UpdateUrlDto } from './dto/update-auth.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('/')
@ApiTags('Urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  @ApiOperation({ summary: 'welcome' })
  @ApiResponse({ status: 201, description: 'Welcome Url Short' })
  @ApiBearerAuth()
  async init() {
    return "Welcome Url Short"
  }

  @ApiOperation({ summary: 'Create url short' })
  @ApiResponse({ status: 201, description: 'Url short' })
  @Post("url")
  async create(@Body(new ValidationPipe()) createUrlDto: CreateUrlDto, @Req() req: { user: UserDto}) {
    return await this.urlService.create(createUrlDto.link, req?.user?.id);
  }

  @ApiOperation({ summary: 'Get all urls by user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'Urls by user' })
  @Get("links")
  async list(@Req() req: { user: UserDto}) {
    return await this.urlService.findAllByUser(req.user.id);
  }

  @ApiOperation({ summary: 'Get url by user and id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'Url by user' })
  @Get("link/:id")
  async find(@Param('id') id: number, @Req() req: { user: UserDto}) {
    return await this.urlService.findByUser(id, req.user.id);
  }

  @ApiOperation({ summary: 'Update url by user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'Url updated' })
  @Patch("link/:id")
  async update(@Param('id') id: number, @Body(new ValidationPipe()) updateUrlDto: UpdateUrlDto, @Req() req: { user: UserDto}) {
    return await this.urlService.update(id, req.user.id, updateUrlDto.link);
  }

  @ApiOperation({ summary: 'Delete url by user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'Url deleted' })
  @Delete("link/:id")
  async delete(@Param('id') id: number, @Req() req: { user: UserDto}) {
    return await this.urlService.delete(id, req.user.id);
  }

  @ApiOperation({ summary: 'Redirect to original url' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 302, description: 'redirect site' })
  @Get(':hash')
  @Redirect(process.env.HOSTNAME_PATH, 302)
  async findAll(@Param('hash') hash: string) {
    return await this.urlService.redirect(hash);
  }

}
