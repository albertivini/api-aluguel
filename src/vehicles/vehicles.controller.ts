import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVehicleDto } from 'src/vehicles/dtos/createVehicleDto';
import { VehiclesService } from './vehicles.service';
import { schemaValidator } from 'src/utils/schemaValidator';
import { createVehicleSchema } from 'src/schemas/createVehicleSchema';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}
  @Get()
  findAll() {
    const response = this.vehiclesService.findAll();
    return response;
  }

  @Post()
  create(@Body() createVehicle: CreateVehicleDto) {
    const body = schemaValidator(
      createVehicle,
      createVehicleSchema,
    ) as CreateVehicleDto;

    this.vehiclesService.create(body);
  }
}
