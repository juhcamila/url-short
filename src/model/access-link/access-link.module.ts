import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccessLinkEntity } from './entities/acess-link.entity';
import { AccessLinkService } from './access-link.service';
import { AccessLinkRepository } from './access-link.repository';
import { UrlModule } from '../url/url.module';

@Module({
  imports: [
    SequelizeModule.forFeature([AccessLinkEntity]),
    UrlModule
  ],
  providers: [
    AccessLinkService,
    AccessLinkRepository,
  ],
  exports: [ AccessLinkService ]
})
export class AccessLinkModule {}
