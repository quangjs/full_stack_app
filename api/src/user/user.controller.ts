import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './types';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcryptjs';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  async hashPassword(plainPassword: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(plainPassword, saltRounds);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() body: User) {
    if (body.password) {
      body.password = await this.hashPassword(body.password);
    }
    return this.userService.createUser(body);
  }
}
