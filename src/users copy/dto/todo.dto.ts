import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the task you want to do',
    example: 'test todo'
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the task you want to do',
    example: 'test todo description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}


export class UpdateTodoDto {
  @ApiProperty({
    description: 'Updated title of the backend task',
    example: 'test todo update'
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Updated description of the task',
    example: 'test todo description update',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Mark the task as completed or not',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}