import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(userDto: { email: string; password: string }): Promise<User> {
    const existing = await this.userModel.findOne({ email: userDto.email });
    if (existing) throw new ConflictException('Email already exists');
    return this.userModel.create(userDto);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }
  

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }
}
