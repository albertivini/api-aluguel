import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { RentsModule } from './rents/rents.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [VehiclesModule, RentsModule, UsersModule],
})
export class AppModule {}
