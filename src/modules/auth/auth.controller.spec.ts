import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as sinon from 'sinon';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService],
    }).compile();

    controller = module.get<AuthController>(AuthController);

    sinon.restore();
  });

  it('SUCCESS: Login', async () => {
    sinon.stub(AuthService.prototype, 'login').resolves('token');

    const response = await controller.login({
      email: 'email@gmail.com',
      password: 'password',
    });

    expect(response).toBe('token');
  });
});
