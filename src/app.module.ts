import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './modules/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './config/database.config';

@Module({
  imports: [TaskModule, TypeOrmModule.forRoot(dataSource)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
