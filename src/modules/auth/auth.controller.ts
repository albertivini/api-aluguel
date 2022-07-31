import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { loginSchema } from '../../schemas/LoginSchema';
import { schemaValidator } from '../../utils/schemaValidator';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/loginDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
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
