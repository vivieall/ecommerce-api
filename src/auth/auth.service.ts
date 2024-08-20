import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService { 
    constructor(private readonly usersRepository: UsersRepository){
        
    }

    signIn(email: string, password: string): string {
        const user = this.usersRepository.findByEmail(email)
        if (!user || user?.password !== password) {
            return 'Email o password incorrecto'
        }
        return 'Login exitoso'
    }
}
