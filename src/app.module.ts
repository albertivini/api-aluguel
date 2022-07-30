import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { RentsModule } from './rents/rents.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoginMiddleware } from './middlewares/login.middleware';
import { AdminMiddleware } from './middlewares/admin.middleware';

@Module({
  imports: [VehiclesModule, RentsModule, UsersModule, AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).forRoutes(VehiclesModule, RentsModule);
    consumer
      .apply(AdminMiddleware)
      .forRoutes({ path: 'vehicles', method: RequestMethod.POST });
  }
}
