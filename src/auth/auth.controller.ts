import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() credentials: LoginUserDto) {
        const { email, password } = credentials
        return this.authService.signIn(email, password)
    }

    @Post('signup')
    @HttpCode(HttpStatus.OK)
    signUp(@Body() user: CreateUserDto) {
        return this.authService.signUp(user);
    }
}
