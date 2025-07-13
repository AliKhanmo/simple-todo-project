import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req, UnauthorizedException} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags,} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUser } from 'src/common/types';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { Todo } from './todo.schema';
import { TodosService } from './todo.service';

@ApiBearerAuth()
@ApiTags('Todos')
@UseGuards(AuthGuard)
@Controller('api/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiOperation({ summary: 'Get all todos of the loggedin user(using token)' })
  @ApiResponse({ status: 200, description: 'List of todos', type: [Todo] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Req() request: RequestWithUser): Promise<Todo[]> {
    if (!request.user?.userId) {
      throw new UnauthorizedException('User ID is missing');
    }
    return this.todosService.findAll(request.user.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({ status: 201, description: 'Todo created', type: Todo })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Req() req: RequestWithUser, @Body() dto: CreateTodoDto) {
    if (!req.user?.userId) {
      throw new UnauthorizedException('User ID is missing');
    }
    return this.todosService.create(req.user.userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo' })
  @ApiBody({ type: UpdateTodoDto })
  @ApiResponse({ status: 200, description: 'Todo updated', type: Todo })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  update(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() dto: UpdateTodoDto,
  ) {
    if (!req.user?.userId) {
      throw new UnauthorizedException('User ID is missing');
    }
    return this.todosService.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiResponse({ status: 200, description: 'Todo deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  delete(@Param('id') id: string, @Req() req: RequestWithUser) {
    if (!req.user?.userId) {
      throw new UnauthorizedException('User ID is missing');
    }
    return this.todosService.delete(id, req.user.userId);
  }
}
