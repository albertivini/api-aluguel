import { Injectable } from '@nestjs/common';
import { User } from './interfaces/User';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create({ name, email, password, isAdmin = false }: User) {
    const user = this.users.find((user) => user.email === email);

    if (user) throw new Error();

    const hashedPassword = bcrypt.hashSync(password, 10);

    const new_user = {
      name,
      email,
      password: hashedPassword,
      isAdmin,
    };

    this.users.push(new_user);
  }
}
