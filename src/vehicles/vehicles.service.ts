import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Vehicle } from './interfaces/Vehicle';

@Injectable()
export class VehiclesService {
  private vehicles: Vehicle[] = [];

  findAll(): Vehicle[] {
    return this.vehicles;
  }

  create(vehicle: Vehicle): void {
    vehicle.id = randomUUID();
    vehicle.isRented = false;

    this.vehicles.push(vehicle);
  }
}
