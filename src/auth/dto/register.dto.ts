import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'Email address used for registration', example: 'example@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the new account', example: 'exampleHashedPass' })
  @IsString()
  password: string;
}
