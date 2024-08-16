import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UrlModule } from './model/url/url.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelizeConfig } from './database/mysql';
import { UserModule } from './model/user/user.module';
import { AuthModule } from './model/auth/auth.module';
import { LoggerMiddleware } from './model/auth/auth.middleware';
import { AccessLinkMiddleware } from './model/access-link/access-link.middleware ';
import { AccessLinkModule } from './model/access-link/access-link.module';

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
    AuthModule,
    AccessLinkModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/l', method: RequestMethod.ALL });

    consumer
      .apply(AccessLinkMiddleware)
      .forRoutes({ path: '/:hash', method: RequestMethod.GET });
  }
}
