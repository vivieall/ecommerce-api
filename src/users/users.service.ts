import { Injectable } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { UsersRepository } from './users.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private configService: ConfigService
  ){
    const dbHost = this.configService.get<string>('DB_HOST')
    console.log(`DB host in ${dbHost}`)
  }

  create(createProduct: Users) {
    return this.usersRepository.save(createProduct)
  }

  async findAll(): Promise<Omit<Users, 'password'>[]> {
    return (await this.usersRepository.findAll()).map(({ password, ...rest}) => rest)
  }

  async findOne(id: string): Promise<Omit<Users, 'password'>> {
    const user = await this.usersRepository.findOne(id)
    const { password, ...rest } = user
    return rest
  }

  async update(id: string, updateUser: Users): Promise<number> {
    return this.usersRepository.update(id, updateUser)
  }

  async remove(id: string): Promise<number> {
    return this.usersRepository.delete(id)
  }
}
