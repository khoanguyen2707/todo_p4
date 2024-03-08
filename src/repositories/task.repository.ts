import { EntityRepository, Repository } from 'typeorm';
import { Task } from '../models/task.model';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
}