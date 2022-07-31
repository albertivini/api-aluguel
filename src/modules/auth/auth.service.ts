import { Injectable } from '@nestjs/common';
import { Login } from './interfaces/Login';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login({ email, password }: Login): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error('Incorrect user or password');

    const comparedPassword = bcrypt.compareSync(password, user.password);

    if (!comparedPassword) throw new Error('Incorrect user or password');

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
