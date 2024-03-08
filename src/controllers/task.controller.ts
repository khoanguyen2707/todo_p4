import {
  Body, Controller, Get, HttpCode,
  Post, UsePipes, ValidationPipe, Param, Patch, Delete,
} from '@nestjs/common';
import { TaskDto } from '../dto/task.dto';
import { TaskService } from '../services/task.service';

@Controller('todo')
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Get('/')
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<TaskDto> {
    return this.taskService.findOne(id);
  }

  @Post('/')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  createTask(@Body() taskdata: TaskDto): Promise<TaskDto> {
    return this.taskService.createTask(taskdata);
  }

  @Patch(':id')
  updateTask(@Param('id') id: number, @Body() taskDto: TaskDto) {
    return this.taskService.updateTask(id, taskDto);
  }

  @Delete(':id')
  removeTask(@Param('id') id: number) {
      return this.taskService.removeTask(id);
  }
}
