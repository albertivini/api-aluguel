import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { PrismaService } from '../../prisma/prisma.service';
import * as sinon from 'sinon';

const vehicle = {
  name: 'celta',
  brand: 'chevrolet',
};

describe('VehiclesController', () => {
  let controller: VehiclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [VehiclesService, PrismaService],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
    sinon.restore();
  });

  it('SUCCESS: Create vehicle ', async () => {
    sinon.stub(VehiclesService.prototype, 'create').resolves();

    const response = await controller.create({ name: 'fox', brand: 'volks' });
    expect(response).toBe(undefined);
  });

  it('SUCCESS: Find all vehicles', async () => {
    const result = [vehicle, vehicle];

    sinon.stub(VehiclesService.prototype, 'findAll').resolves(result);

    const response = await controller.findAll();

    expect(response).toStrictEqual([vehicle, vehicle]);
  });
});
