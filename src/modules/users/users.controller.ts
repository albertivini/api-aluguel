import { Body, Controller, Post } from '@nestjs/common';
import { createUserSchema } from 'src/schemas/createUserSchema';
import { schemaValidator } from 'src/utils/schemaValidator';
import { CreateUserDto } from './dtos/createUserDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUser: CreateUserDto) {
    const body = schemaValidator(createUser, createUserSchema) as CreateUserDto;

    this.usersService.create(body);
  }
}
