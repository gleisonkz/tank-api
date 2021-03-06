import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      migrations: ['dist/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations_history',
      migrationsRun: true,
      cli: {
        migrationsDir: './src/migrations/',
      },
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
    }),
  ],
})
export class DatabaseModule {}
