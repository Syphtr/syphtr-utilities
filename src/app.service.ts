import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from './drizzle/constants/db.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from 'src/drizzle/migrations/schema';

@Injectable()
export class AppService {
  constructor(
    @Inject(PG_CONNECTION) private conn: PostgresJsDatabase<typeof schema>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getProfile() {
    // console.log(this.conn);

    return this.conn.query.Profile.findFirst();
  }
}
