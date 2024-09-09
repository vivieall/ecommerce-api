import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let mockUsersRepository;

  beforeEach(async () => {
    mockUsersRepository = {
      findAll: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockUsersRepository }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return filtered user list without passwords', async () => {
      const users = [
        { id: '1', name: 'User One', password: 'pass123', isAdmin: true },
        { id: '2', name: 'User Two', password: 'pass456', isAdmin: false }
      ];
      mockUsersRepository.findAll.mockResolvedValue(users);
      
      const result = await service.findAll();
      expect(result).toEqual(users.map(({ password, ...rest }) => rest));
      expect(mockUsersRepository.findAll).toHaveBeenCalled();
    });

  });

  describe('remove', () => {
    it('should delete a user by ID', async () => {
      const userId = '1';
      mockUsersRepository.delete.mockResolvedValue(1);

      const result = await service.delete(userId);
      expect(result).toBe(1);
      expect(mockUsersRepository.delete).toHaveBeenCalledWith(userId);
    });
  });

});