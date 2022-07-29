import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { RentsModule } from './rents/rents.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoginMiddleware } from './middlewares/login.middleware';

@Module({
  imports: [VehiclesModule, RentsModule, UsersModule, AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).forRoutes(VehiclesModule, RentsModule);
  }
}
