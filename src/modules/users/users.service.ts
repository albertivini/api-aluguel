import { Injectable } from '@nestjs/common';
import { User } from './interfaces/User';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create({ name, email, password, isAdmin }: User) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) throw new Error('User already exists');

    const hashedPassword = bcrypt.hashSync(password, 10);

    await this.prisma.user.create({
      data: {
        name,
        email,
        isAdmin,
        password: hashedPassword,
      },
    });
  }
}
