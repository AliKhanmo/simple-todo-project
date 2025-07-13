import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { Todo, TodoDocument } from './todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findAll(userId: string): Promise<Todo[]> {
    return this.todoModel.find({ userId }).sort({ createdAt: -1 });
  }

  async create(userId: string, dto: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create({ ...dto, userId });
  }

  async update(id: string, userId, dto: UpdateTodoDto): Promise<Todo> {
    const updated = await this.todoModel.findOneAndUpdate(
      { _id: id, userId },
      dto,
      { new: true }
    );
    if (!updated) throw new NotFoundException('Todo not found or unauthorized');
    return updated;
  }

  async delete(id: string, userId: string): Promise<void> {
    const result = await this.todoModel.deleteOne({ _id: id, userId });
    if (result.deletedCount === 0)
      throw new NotFoundException('Todo not found or unauthorized');
  }
}
