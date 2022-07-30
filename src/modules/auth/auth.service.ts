import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/interfaces/User';
import { Login } from './interfaces/Login';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private users: User[] = [];

  login({ email, password }: Login) {
    const user = this.users.find((user) => user.email === email);

    if (!user) throw new Error();

    const comparedPassword = bcrypt.compareSync(password, user.password);

    if (!comparedPassword) throw new Error();

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
