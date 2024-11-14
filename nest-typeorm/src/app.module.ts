import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { CityModule } from './city/city.module';
// import { City } from './city/entities/city.entity';
import { ArticleModule } from './article/article.module';
import { Article } from './article/entities/article.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'nest-migration-test',
      synchronize: false,
      logging: true,
      // entities: [User, City],
      entities: [Article],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    CityModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
