import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Rent } from './interfaces/Rent';

@Injectable()
export class RentsService {
  constructor(private prisma: PrismaClient) {}

  async create({ vehicleId, userId }: Rent): Promise<void> {
    const vehicle = await this.prisma.rental.findFirst({
      where: {
        vehicleId,
        isRented: true,
      },
    });

    if (vehicle) throw new Error('Vehicle is already rented');

    const user = await this.prisma.rental.findFirst({
      where: {
        userId,
        isRented: true,
      },
    });

    if (user) throw new Error('There is already a rental car for the user');

    await this.prisma.rental.create({
      data: {
        userId,
        vehicleId,
        isRented: true,
      },
    });
  }

  async devolution({ vehicleId, userId }: Rent): Promise<void> {
    const rental = await this.prisma.rental.findFirst({
      where: {
        userId,
        vehicleId,
        isRented: true,
      },
    });

    if (!rental) throw new Error('Does not exist rented car to this user');

    rental.isRented = false;

    await this.prisma.rental.update({
      data: {
        isRented: false,
      },
      where: {
        id: rental.id,
      },
    });
  }
}
