import { Controller, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { RentsService } from './rents.service';

@Controller('rents')
export class RentsController {
  constructor(private rentsService: RentsService) {}

  @Post(':vehicle_id')
  create(@Param() vehicleId: string, @Req() request: Request) {
    const { userId } = request;
    this.rentsService.create({ vehicleId, userId });
  }

  @Put(':vehicle_id')
  devolution(@Param() vehicleId: string, @Req() request: Request) {
    const { userId } = request;
    this.rentsService.devolution({ vehicleId, userId });
  }
}
