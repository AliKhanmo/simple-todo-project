import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Email address of the user attempting to log in', example: 'example@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Password of the user', example: 'exampleHashedPass' })
  @IsString()
  password: string;
}
