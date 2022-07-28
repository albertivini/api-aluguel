import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { RentsModule } from './rents/rents.module';

@Module({
  imports: [VehiclesModule, RentsModule],
})
export class AppModule {}
