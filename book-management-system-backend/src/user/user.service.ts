import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DbService } from 'src/db/db.service';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  @Inject(DbService)
  dbService: DbService;

  async create(createUserDto: CreateUserDto) {
    const users: User[] = await this.dbService.read();

    const foundUser = users.find(
      (item) => item.username === createUserDto.username,
    );

    if (foundUser) {
      throw new BadRequestException('该用户已经注册');
    }

    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    users.push(user);

    await this.dbService.write(users);
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();

    const foundUser = users.find(
      (item) => item.username === loginUserDto.username,
    );

    if (!foundUser) {
      throw new BadRequestException('该用户不存在');
    }

    if (foundUser.password !== loginUserDto.password) {
      throw new BadRequestException('密码不正确');
    }

    return foundUser;
  }
}
