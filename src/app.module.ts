import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { RentsModule } from './rents/rents.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [VehiclesModule, RentsModule, UsersModule, AuthModule],
})
export class AppModule {}
