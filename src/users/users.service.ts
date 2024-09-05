import { Injectable } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { UsersRepository } from './users.repository';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository
  ){}

  async findAll(): Promise<Omit<Users, 'password'>[]> {
    return (await this.usersRepository.findAll()).map(({ password, ...rest}) => rest)
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async update(id: string, updateUser: Users): Promise<number> {
    return this.usersRepository.update(id, updateUser)
  }

  async remove(id: string): Promise<number> {
    return this.usersRepository.delete(id)
  }
}
