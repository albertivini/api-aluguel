import { Injectable } from '@nestjs/common';
import { User } from 'src/users/interfaces/User';
import { Login } from './interfaces/Login';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users: User[] = [];

  login({ email, password }: Login) {
    const user = this.users.find((user) => user.email === email);

    if (!user) throw new Error();

    const comparedPassword = bcrypt.compareSync(password, user.password);

    if (!comparedPassword) throw new Error();
  }
}
