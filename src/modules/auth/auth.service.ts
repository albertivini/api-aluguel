import { Injectable } from '@nestjs/common';
import { Login } from './interfaces/Login';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaClient) {}

  async login({ email, password }: Login) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error('User does not exists');

    const comparedPassword = bcrypt.compareSync(password, user.password);

    if (!comparedPassword) throw new Error('');

    const token = sign(
      {
        email: user.email,
      },
      '2d194c84f2ffe2d669ba79af22e48bcc',
      {
        subject: user.id,
        expiresIn: '1h',
      },
    );

    return token;
  }
}
