import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Payload } from './interfaces/Payload';
import { verify } from 'jsonwebtoken';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const [, token] = authToken.split(' ');

    try {
      const { sub } = verify(
        token,
        '2d194c84f2ffe2d669ba79af22e48bcc',
      ) as Payload;

      req.userId = sub;

      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
