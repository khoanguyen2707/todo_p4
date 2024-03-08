import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDto } from '../dto/task.dto';
import { Task } from '../models/task.model';
import { TaskRepository } from '../repositories/task.repository';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: TaskRepository
    ) { }

    // get all
    async findAll(): Promise<TaskDto[]> {
        try {
            const tasks = await this.taskRepository.find();

            if (!tasks || tasks.length === 0) { return []; }

            //chuyển đổi mỗi task thành một đối tượng TaskDto
            return tasks.map(({ id, title, body, createdAt }) => ({
                id,
                title,
                body,
                createdAt,
            }));
        } catch (error) {
            throw new NotFoundException('Failed to fetch tasks');
        }
    }
    // get a task by id
    async findOne(id: number): Promise<TaskDto | null> {
        try {
            const task = await this.taskRepository.findOne({ where: { id } });

            if (!task) {
                throw new Error('Task not found');
            }

            return {
                title: task.title,
                body: task.body,
                createdAt: task.createdAt,
            };
        } catch (error) {
            console.error('Error finding task:', error);
            throw new Error('Failed to find task');
        }
    }

    // create a task
    async createTask(taskDto: TaskDto): Promise<TaskDto> {
        try {
            const { title, body } = taskDto;

            const newTask = this.taskRepository.create({ title, body, createdAt: new Date() });

            const createdTask = await this.taskRepository.save(newTask);

            return {
                title: createdTask.title,
                body: createdTask.body,
                createdAt: createdTask.createdAt,
            };
        } catch (error) {
            throw new Error(`Failed to create task: ${error.message}`);
        }
    }
    // update a task
    async updateTask(id: number, taskDto: TaskDto): Promise<TaskDto | null> {
        try {
            const task = await this.taskRepository.findOne({ where: { id } });
            if (!task) {
                throw new Error('Task not found');
            }
            const taskUpdate = await this.taskRepository.update(
                { id: id },
                {
                    title: taskDto.title,
                    body: taskDto.body,
                    createdAt: new Date()
                })
            const updatedTaskDto: TaskDto = {
                title: taskDto.title,
                body: taskDto.body,
                createdAt: new Date(),
            };

            return updatedTaskDto;
        }
        catch (error) {
            throw new Error(`Failed to update task: ${error.message}`);
        };
    }
    //remove a task by id
    async removeTask(id: number) {
        try {
           return await this.taskRepository.delete({ id });
            
        }
        catch (error) {
            throw new Error(`Failed to nemove task: ${error.message}`);
        };
    }
}
