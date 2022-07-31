import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { RentsController } from './rents.controller';
import { RentsService } from './rents.service';
import * as sinon from 'sinon';
import { Request } from 'express';

describe('RentsController', () => {
  let controller: RentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentsController],
      providers: [RentsService, PrismaService],
    }).compile();

    controller = module.get<RentsController>(RentsController);

    sinon.restore();
  });

  it('SUCCESS: Create Rental', async () => {
    sinon.stub(RentsService.prototype, 'create').resolves();

    const request = {
      userId: 'user',
    } as unknown as Request;

    const response = await controller.create('vehicle', request);

    expect(response).toBe(undefined);
  });

  it('SUCCESS: Devolution', async () => {
    sinon.stub(RentsService.prototype, 'devolution').resolves();

    const request = {
      userId: 'user',
    } as unknown as Request;

    const response = await controller.devolution('vehicle', request);

    expect(response).toBe(undefined);
  });
});
