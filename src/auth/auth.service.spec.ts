import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';

const mockUser = {
  id: 'user123',
  email: 'ali@test.com',
  password: 'hashed_password',
};

const mockUsersService = {
  create: jest.fn(),
  findByEmail: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should hash the password and create a user', async () => {
      mockUsersService.create.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed_password' as never);

      const result = await service.register('ali@test.com', 'plainpassword');

      expect(bcrypt.hash).toHaveBeenCalledWith('plainpassword', 10);
      expect(mockUsersService.create).toHaveBeenCalledWith({
        email: 'ali@test.com',
        password: 'hashed_password',
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('validateUser', () => {
    it('should return null when user is not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser('nobody@test.com', 'password');

      expect(result).toBeNull();
    });

    it('should return null when password is invalid', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      const result = await service.validateUser('ali@test.com', 'wrongpassword');

      expect(result).toBeNull();
    });

    it('should return user when credentials are valid', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.validateUser('ali@test.com', 'correctpassword');

      expect(result).toEqual(mockUser);
    });
  });

  describe('login', () => {
    it('should return an accessToken', async () => {
      mockJwtService.signAsync.mockResolvedValue('signed_jwt_token');

      const result = await service.login(mockUser);

      expect(mockJwtService.signAsync).toHaveBeenCalledWith(
        { email: mockUser.email, userId: mockUser.id },
        { secret: process.env.JWT_SECRET, expiresIn: '2h' },
      );
      expect(result).toEqual({ accessToken: 'signed_jwt_token' });
    });
  });
});