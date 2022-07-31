import { Body, Controller, Post } from '@nestjs/common';
import { loginSchema } from '../../schemas/LoginSchema';
import { schemaValidator } from '../../utils/schemaValidator';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/loginDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() login: LoginDto) {
    const body = schemaValidator(login, loginSchema) as LoginDto;

    const response = this.authService.login(body);

    return response;
  }
}
