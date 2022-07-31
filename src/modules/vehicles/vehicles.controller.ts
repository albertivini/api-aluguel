import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateVehicleDto } from './dtos/createVehicleDto';
import { VehiclesService } from './vehicles.service';
import { schemaValidator } from '../../utils/schemaValidator';
import { createVehicleSchema } from '../../schemas/createVehicleSchema';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}
  @Get()
  async findAll() {
    try {
      const response = await this.vehiclesService.findAll();
      return response;
    } catch (err) {
      throw new HttpException(
        {
          error: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async create(@Body() createVehicle: CreateVehicleDto) {
    try {
      const body = schemaValidator(
        createVehicle,
        createVehicleSchema,
      ) as CreateVehicleDto;

      await this.vehiclesService.create(body);
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
