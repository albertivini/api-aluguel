import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Rent } from './interfaces/Rent';

@Injectable()
export class RentsService {
  private rents: Rent[] = [];

  create({ vehicleId, userId }: Rent) {
    const vehicle = this.rents.find(
      (rent) => rent.vehicleId === vehicleId && rent.isRented === true,
    );

    if (vehicle) throw new Error();

    const user = this.rents.find(
      (rent) => rent.userId === userId && rent.isRented === true,
    );

    if (user) throw new Error();

    const rent: Rent = {
      id: randomUUID(),
      vehicleId,
      userId,
      isRented: true,
    };

    this.rents.push(rent);
  }

  devolution({ vehicleId, userId }: Rent) {
    const rental = this.rents.find(
      (rent) => rent.userId === userId && rent.vehicleId === vehicleId,
    );

    if (!rental) throw new Error();

    rental.isRented = false;
  }
}
