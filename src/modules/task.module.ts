import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from '../controllers/task.controller';
import { TaskRepository } from '../repositories/task.repository';
import { TaskService } from '../services/task.service';
import { Task } from 'src/models/task.model';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [TaskService, TaskRepository],
    controllers: [TaskController],
})

export class TaskModule {}