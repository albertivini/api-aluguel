import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { RentsModule } from './modules/rents/rents.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoginMiddleware } from './middlewares/login.middleware';
import { AdminMiddleware } from './middlewares/admin.middleware';
import { PrismaService } from './prisma/prisma.service';
import { VehiclesController } from './modules/vehicles/vehicles.controller';
import { RentsController } from './modules/rents/rents.controller';

@Module({
  imports: [VehiclesModule, RentsModule, UsersModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginMiddleware)
      .forRoutes(VehiclesController, RentsController);
    consumer
      .apply(AdminMiddleware)
      .forRoutes({ path: 'vehicles', method: RequestMethod.POST });
  }
}
