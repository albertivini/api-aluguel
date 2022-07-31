import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req;

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (user?.isAdmin) {
      return next();
    }

    return res.status(401).json({
      error: 'Unauthorized',
    });
  }
}
