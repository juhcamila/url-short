import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { UrlEntity } from 'src/model/url/entities/url.entity';

export const getSequelizeConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => {
  return {
    dialect: 'mysql',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
    models: [UrlEntity], 
  };
};