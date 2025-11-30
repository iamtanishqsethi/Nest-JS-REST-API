import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John',
      email: '<EMAIL>',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Doe',
      email: '<EMAIL>',
      role: 'intern',
    },
    {
      id: 3,
      name: 'Jane',
      email: '<EMAIL>',
      role: 'engineer',
    },
  ];

  getAllUsers(role?: 'intern' | 'engineer' | 'admin') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('No users found with that role');
      return rolesArray;
    }
    return this.users;
  }
  getUserById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }
  createUser(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newId = usersByHighestId[0].id + 1;
    const newUser = { id: newId, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }
  updateUser(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((u) => {
      if (u.id === id) {
        return { ...u, ...updateUserDto };
      }
      return u;
    });
    return this.getUserById(id);
  }
  deleteUser(id: number) {
    const removedUser = this.getUserById(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
