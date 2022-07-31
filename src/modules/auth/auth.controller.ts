import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiBadRequestResponse } from '@nestjs/swagger';
import { loginSchema } from '../../schemas/LoginSchema';
import { schemaValidator } from '../../utils/schemaValidator';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/loginDto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiHeader({
    name: 'Login',
    description: 'User authentication',
  })
  @Post()
  @ApiBadRequestResponse()
  async login(@Body() login: LoginDto) {
    try {
      const body = schemaValidator(login, loginSchema) as LoginDto;

      const token = await this.authService.login(body);

      return { token };
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
