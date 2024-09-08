import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entities/users.entity";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async findAll(page: number = 1, limit: number = 5): Promise<Partial<Users[]>> {
    let users = await this.usersRepository.find();
    const start = (page - 1) * limit;
    const end = start + limit;
    users = users.slice(start, end);

    return users;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });

    const { password, isAdmin, ...userWithoutPassword } = user;
  
    return userWithoutPassword;
  }

  async save(user: Partial<Users>): Promise<Partial<Users>> {
    const newUser = await this.usersRepository.save(user);
    const { password, isAdmin, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  async update(id: string, user: Users) {
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOneBy({ id });

    return parseInt(updatedUser.id)
  }

  async delete(id: string): Promise<number> {
    const user = await this.usersRepository.findOneBy({ id });
    this.usersRepository.remove(user);

    return parseInt(id)
  }

  async findByEmail(email: string): Promise<Users> {
    return await this.usersRepository.findOneBy({ email });
  }
}
