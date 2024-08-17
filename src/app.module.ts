import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UrlModule } from './model/url/url.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelizeConfig } from './database/mysql';
import { AuthModule } from './model/auth/auth.module';
import { AccessLinkMiddleware } from './model/access-link/access-link.middleware ';
import { AccessLinkModule } from './model/access-link/access-link.module';
import { AuthMiddleware } from './model/auth/auth.middleware';
import { AppMiddleware } from './app.middleware';

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
    AuthModule,
    UrlModule,
    AccessLinkModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AppMiddleware)
    .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/link*', method: RequestMethod.ALL });

    consumer
      .apply(AccessLinkMiddleware)
      .forRoutes({ path: '/:hash', method: RequestMethod.GET });
  }
}
