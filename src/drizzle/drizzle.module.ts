import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import { PG_CONNECTION } from './constants/db.constants';
import * as schema from './migrations/schema';
import { ConfigService } from '@nestjs/config';
import * as postgres from 'postgres';

@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        const client = postgres(connectionString, { prepare: false });
        return drizzle(client, { schema });
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}
