import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Rent } from './interfaces/Rent';

@Injectable()
export class RentsService {
  private rents: Rent[] = [];

  create({ vehicle_id, user_id }: Rent) {
    const vehicle = this.rents.find(
      (rent) => rent.vehicle_id === vehicle_id && rent.isRented === true,
    );

    if (vehicle) throw new Error();

    const user = this.rents.find(
      (rent) => rent.user_id === user_id && rent.isRented === true,
    );

    if (user) throw new Error();

    const rent: Rent = {
      id: randomUUID(),
      vehicle_id,
      user_id,
      isRented: true,
    };

    this.rents.push(rent);
  }

  devolution({ vehicle_id, user_id }: Rent) {
    const rental = this.rents.find(
      (rent) => rent.user_id === user_id && rent.vehicle_id === vehicle_id,
    );

    if (!rental) throw new Error();

    rental.isRented = false;
  }
}
