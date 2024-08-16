import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { UrlRepository } from './url.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { UrlEntity } from './entities/url.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([UrlEntity])
  ],
  controllers: [UrlController],
  providers: [
    UrlService,
    UrlRepository
  ],
})
export class UrlModule {}
