import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVehicleDto } from 'src/vehicles/dtos/createVehicleDto';
import { VehiclesService } from './vehicles.service';

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
    this.vehiclesService.create(createVehicle);
  }
}
