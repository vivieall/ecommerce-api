import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
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

  create(createProduct: User) {
    return this.usersRepository.save(createProduct)
  }

  findAll(): Omit<User, 'password'>[] {
    return this.usersRepository.findAll().map(({ password, ...rest}) => rest)
  }

  findOne(id: string): Omit<User, 'password'> {
    const user = this.usersRepository.findOne(id)
    const { password, ...rest } = user
    return rest
  }

  update(id: string, updateUser: User): number {
    return this.usersRepository.update(id, updateUser)
  }

  remove(id: string): number {
    return this.usersRepository.delete(id)
  }
}
