import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { validateUser } from 'src/utils/validate';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUser: Users) {
    return this.usersService.update(id, updateUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
