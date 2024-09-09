import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersRepository;
  let mockJwtService;

  beforeEach(async () => {
    mockUsersRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    };

    mockJwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersRepository, useValue: mockUsersRepository },
        { provide: JwtService, useValue: mockJwtService }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should throw BadRequestException if email or password is not provided', async () => {
    await expect(service.signIn('', '')).rejects.toThrow(BadRequestException);
    await expect(service.signIn('email@example.com', '')).rejects.toThrow(BadRequestException);
    await expect(service.signIn('', 'password')).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException if user is not found', async () => {
    mockUsersRepository.findByEmail.mockResolvedValue(null);
    await expect(service.signIn('nonexistent@example.com', 'password')).rejects.toThrow(BadRequestException);
  });

  it('should return a valid token when credentials are correct', async () => {
    const mockUser = { id: '1', email: 'user@example.com', password: 'hashedPassword', isAdmin: true };
    mockUsersRepository.findByEmail.mockResolvedValue(mockUser);
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    mockJwtService.sign.mockReturnValue('jwtToken');
    
    const result = await service.signIn('user@example.com', 'correctPassword');
    
    expect(result).toEqual({
      token: 'jwtToken',
      message: 'Usuario se logueo exitosamente',
    });
    expect(bcrypt.compare).toHaveBeenCalledWith('correctPassword', 'hashedPassword');
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      id: mockUser.id,
      email: mockUser.email,
      isAdmin: mockUser.isAdmin,
    });
  });
  
});