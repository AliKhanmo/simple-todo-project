import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
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
        { provide: JwtService, useValue: mockJwtService }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should create the user if email is not in db', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed_password' as never);
      mockUsersService.create.mockResolvedValue(mockUser)

      const dto = { email: mockUser.email, password: 'hashed_password' };
      const result = await service.register(mockUser.email, 'hashed_password');
      expect(mockUsersService.create).toHaveBeenCalledWith({
        ...dto
      });
      expect(result).toEqual(mockUser);
    });
  });
});