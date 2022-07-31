import { Controller, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { RentsService } from './rents.service';

@Controller('rents')
export class RentsController {
  constructor(private rentsService: RentsService) {}

  @Post(':vehicle_id')
  async create(@Param() vehicleId: string, @Req() request: Request) {
    const { userId } = request;
    await this.rentsService.create({ vehicleId, userId });
  }

  @Put(':vehicle_id')
  async devolution(@Param() vehicleId: string, @Req() request: Request) {
    const { userId } = request;
    await this.rentsService.devolution({ vehicleId, userId });
  }
}
