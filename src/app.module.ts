import { Module } from '@nestjs/common';
import { UrlModule } from './model/url/url.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelizeConfig } from './database/mysql';
import { UserModule } from './model/user/user.module';
import { AuthModule } from './model/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getSequelizeConfig,
      inject: [ConfigService],
    }),
    UrlModule,
    UserModule,
    AuthModule
  ],
})
export class AppModule {}
