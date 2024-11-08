import { DynamicModule, Module } from '@nestjs/common';
import { DbService } from './db.service';

export interface DbModuleOptions {
  path: string;
}

export const DB_TOKEN = 'DB_TOKEN';

@Module({})
export class DbModule {
  static register(options: DbModuleOptions): DynamicModule {
    return {
      module: DbModule,
      providers: [
        {
          provide: DB_TOKEN,
          useValue: options,
        },
        DbService,
      ],
      exports: [DbService],
    };
  }
}
