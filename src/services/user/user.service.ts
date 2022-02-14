import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';

import { CreateUserDto, UpdateProductDto } from 'src/dtos/user.dto';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: '1',
      name: 'User 1',
      email: 'asd@asd.asd',
      password: 'asdasd',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'User 2',
      email: 'asd2@asd.asd',
      password: 'asdasd2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  private counterId = this.users.length;

  findAll() {
    const users = this.users;
    if (!users) {
      return new NotFoundException(`Users not found`);
    }
    return users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId.toString(),
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, payload: UpdateProductDto) {
    const user = this.findOne(id);
    user.updatedAt = new Date();
    Object.assign(user, payload);
    return user;
  }

  delete(id: string) {
    const user = this.findOne(id);
    this.users.splice(this.users.indexOf(user), 1);
    return user;
  }
}
