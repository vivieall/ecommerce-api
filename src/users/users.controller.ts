import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { Roles } from './../decorators/roles/roles.decorator';
import { Role } from './enum/roles.enum';
import { RolesGuard } from './../auth/guards/roles.guard';
import { AuthGuard } from './../auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUser: Users) {
    return this.usersService.update(id, updateUser);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
