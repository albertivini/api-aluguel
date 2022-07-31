import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Vehicle } from './interfaces/Vehicle';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Vehicle[]> {
    const vehicles = await this.prisma.vehicle.findMany();
    return vehicles;
  }

  async create({ brand, name }: Vehicle): Promise<void> {
    await this.prisma.vehicle.create({
      data: {
        name,
        brand,
        isRented: false,
      },
    });
  }
}
