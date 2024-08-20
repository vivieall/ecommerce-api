import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    signIn(@Body('email') email: string, @Body('password') password: string){
        if (!email || !password) {
            return 'Email y password son requeridos'
        }
        return this.authService.signIn(email, password)
    }
}
