import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService { 
    constructor(private readonly usersRepository: UsersRepository,
        private jwtService: JwtService,
    ){}

    async signIn(email: string, password: string) {
        if (!email || !password) {
          throw new BadRequestException('Email y password son requeridos');
        }
    
        const user = await this.usersRepository.findByEmail(email);
    
        if (!user) {
          throw new NotFoundException('Usuario no encontrado');
        }
    
        const isPasswordMatch = await bcrypt.compare(password, user.password);
    
        if (!isPasswordMatch) {
          throw new BadRequestException('Credenciales inválidas');
        }
    
        const userPayload = {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
        };
    
        const token = this.jwtService.sign(userPayload);
    
        return {
          token,
          message: 'Usuario logueado exitosamente',
        };
      }
    
      async signUp(user: CreateUserDto) {

        if (user.password !== user.confirmPassword) {
            console.log(user)
            throw new BadRequestException('Password no corresponde al confirmPassword');
        }

        const foundUser = await this.usersRepository.findByEmail(user.email);
    
        if (foundUser) {
          throw new BadRequestException('El usuario ya esta registrado');
        }
    
        const hashedPassword = await bcrypt.hash(user.password, 10);
    
        if (!hashedPassword) {
          throw new BadRequestException('Error hashing password');
        }
    
        await this.usersRepository.save({
          ...user,
          password: hashedPassword,
        });

        const { password, confirmPassword, ...userWithoutPassword } = user;

        return userWithoutPassword;
      }
}
