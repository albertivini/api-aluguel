import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/modules/users/interfaces/User';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  private users: User[] = [];

  use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req;

    const user = this.users.find((user) => user.id === userId);

    if (user.isAdmin) {
      return next();
    }

    return res.status(401).json({
      error: 'Unauthorized',
    });
  }
}
