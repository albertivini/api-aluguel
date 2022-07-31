import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { createUserSchema } from '../../schemas/createUserSchema';
import { schemaValidator } from '../../utils/schemaValidator';
import { CreateUserDto } from './dtos/createUserDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUser: CreateUserDto) {
    try {
      const body = schemaValidator(
        createUser,
        createUserSchema,
      ) as CreateUserDto;

      await this.usersService.create(body);
    } catch (err) {
      throw new HttpException(
        {
          error: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
