import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVehicleDto } from './dtos/createVehicleDto';
import { VehiclesService } from './vehicles.service';
import { schemaValidator } from '../../utils/schemaValidator';
import { createVehicleSchema } from '../../schemas/createVehicleSchema';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}
  @Get()
  async findAll() {
    const response = await this.vehiclesService.findAll();
    return response;
  }

  @Post()
  async create(@Body() createVehicle: CreateVehicleDto) {
    const body = schemaValidator(
      createVehicle,
      createVehicleSchema,
    ) as CreateVehicleDto;

    await this.vehiclesService.create(body);
  }
}
