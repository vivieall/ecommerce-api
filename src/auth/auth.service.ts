import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository,
        private jwtService: JwtService,
    ){
        
    }

    async signIn(email: string, password: string) {

        if (!email || !password) {
            throw new BadRequestException('Email y password requerido')
        }

        const user = await this.usersRepository.findByEmail(email)
        if (!user) {
            throw new BadRequestException('Usuario no encontrado')
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if(!isPasswordMatch) {
            throw new BadRequestException('Credencial no válida')
        }

        const userPayload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin 
        }

        const token = this.jwtService.sign(userPayload);

        return {
            token,
            message: 'Usuario se logueo exitosamente',
        }

    }

    async signUp(user: CreateUserDto) {
    const foundUser = await this.usersRepository.findByEmail(user.email);

      if (foundUser) {
        throw new BadRequestException('El usuario ya existe')
      }

      if (user.password !== user.confirmPassword) {
        throw new BadRequestException('Las contraseñas no coinciden')
      }

      const hashedPassword = await bcrypt.hash(user.password, 10)

      if (!hashedPassword) {
        throw new BadRequestException('Hubo un error al hashear el password')
      }

      await this.usersRepository.save({
        ...user,
        password: hashedPassword
      })

      const { password, confirmPassword, ...userWithoutPassword } = user

      return userWithoutPassword
    } 
}
