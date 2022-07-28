import { Controller, Param, Post, Put } from '@nestjs/common';
import { RentsService } from './rents.service';

@Controller('rents')
export class RentsController {
  constructor(private rentsService: RentsService) {}

  @Post(':vehicle_id')
  create(@Param() vehicle_id: string) {
    const user_id = 'user';
    this.rentsService.create({ vehicle_id, user_id });
  }

  @Put(':vehicle_id')
  devolution(@Param() vehicle_id: string) {
    const user_id = 'user';
    this.rentsService.devolution({ user_id, vehicle_id });
  }
}
