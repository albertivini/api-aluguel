import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUserDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() { name, email, isAdmin, password }: CreateUserDto) {
    this.usersService.create({
      name,
      email,
      password,
      isAdmin,
    });
  }
}
