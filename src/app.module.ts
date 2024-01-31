import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Board } from './boards/dto/BoardEntity';

@Module({
  imports: [
    BoardsModule, 
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Board],
        synchronize: true
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      
    })
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {
}
