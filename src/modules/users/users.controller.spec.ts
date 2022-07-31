import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import * as sinon from 'sinon';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);

    sinon.restore();
  });

  it('SUCCESS: Create User ', async () => {
    sinon.stub(UsersService.prototype, 'create').resolves();

    const response = await controller.create({
      name: 'fox',
      email: 'email@email.com',
      password: 'password',
      isAdmin: false,
    });
    expect(response).toBe(undefined);
  });
});
