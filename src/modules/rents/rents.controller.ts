import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { RentsService } from './rents.service';

@Controller('rents')
export class RentsController {
  constructor(private rentsService: RentsService) {}

  @Post(':vehicleId')
  async create(@Req() request: Request) {
    try {
      const { userId } = request;

      const { vehicleId } = request.params;

      await this.rentsService.create({ vehicleId, userId });
    } catch (err) {
      throw new HttpException(
        {
          error: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':vehicleId')
  async devolution(@Req() request: Request) {
    try {
      const { userId } = request;
      const { vehicleId } = request.params;

      await this.rentsService.devolution({ vehicleId, userId });
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
