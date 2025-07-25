import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ required: true })
  userId: string; 
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
