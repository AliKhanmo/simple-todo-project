import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The email address of the user',
  example: 'example@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password for the user account',
  example: 'examplePass' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
