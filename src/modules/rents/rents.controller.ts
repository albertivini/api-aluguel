import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiBadRequestResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { RentsService } from './rents.service';

@ApiTags('rents')
@Controller('rents')
export class RentsController {
  constructor(private rentsService: RentsService) {}

  @ApiHeader({
    name: 'Rent',
    description: 'Car rental',
  })
  @ApiBadRequestResponse()
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

  @ApiHeader({
    name: 'Devolution',
    description: 'Car devolution',
  })
  @ApiBadRequestResponse()
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
