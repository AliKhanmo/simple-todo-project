import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { TodosService } from './todo.service';
import { Todo } from './todo.schema';

const mockTodo = {
    _id: 'todo123',
    title: 'Test Todo',
    description: 'Test Description',
    isCompleted: false,
    userId: 'user123',
};

const mockTodoModel = {
    find: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
};

describe('TodosService', () => {
    let service: TodosService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TodosService,
                {
                    provide: getModelToken(Todo.name),
                    useValue: mockTodoModel,
                },
            ],
        }).compile();

        service = module.get<TodosService>(TodosService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findAll', () => {
        it('should return all todos for a user', async () => {
            mockTodoModel.find.mockReturnValue({
                sort: jest.fn().mockResolvedValue([mockTodo]),
            });

            const result = await service.findAll('user123');

            expect(mockTodoModel.find).toHaveBeenCalledWith({ userId: 'user123' });
            expect(result).toEqual([mockTodo]);
        });
    });

    describe('create', () => {
        it('should create a todo with the correct userId', async () => {
            mockTodoModel.create.mockResolvedValue(mockTodo);

            const dto = { title: 'Test Todo', description: 'Test Description' };
            const result = await service.create('user123', dto);

            expect(mockTodoModel.create).toHaveBeenCalledWith({
                ...dto,
                userId: 'user123',
            });
            expect(result).toEqual(mockTodo);
        });
    });

    describe('delete', () => {
        it('should throw NotFoundException when todo does not exist', async () => {
            mockTodoModel.deleteOne.mockResolvedValue({ deletedCount: 0 });

            await expect(service.delete('nonexistent', 'user123')).rejects.toThrow(
                NotFoundException,
            );
        });

        it('should delete successfully when todo exists', async () => {
            mockTodoModel.deleteOne.mockResolvedValue({ deletedCount: 1 });

            await expect(
                service.delete('todo123', 'user123'),
            ).resolves.toBeUndefined();
        });
    });
});