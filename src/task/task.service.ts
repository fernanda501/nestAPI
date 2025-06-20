import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entitys/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>;
    async findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }
    async findOne(id: number): Promise<Task> {
        const Task = await this.taskRepository.findOneBy({id});
        if (!Task) {
            throw new HttpException('Task not found', 
                HttpStatus.NOT_FOUND
            );
        }
        return Task;
    }
    async create(task: Task): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
}

async update(id: number, task: Task): Promise<Task> {
    const existingTask = await this.taskRepository.findOneBy({ id });
    if (!existingTask) {
        throw new HttpException(
            `Task with ID ${id} not found`,
            HttpStatus.NOT_FOUND,
    );
    }
    const updatedTask = Object.assign(existingTask, task);
    return this.taskRepository.save(updatedTask);
}
async delete(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
        throw new HttpException(
            `Task with ID ${id} not found`,
            HttpStatus.NOT_FOUND,
        );
    }

}
}