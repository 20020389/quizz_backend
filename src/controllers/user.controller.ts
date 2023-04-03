import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/services/user.service';

@Controller('/api/users')
export class UserController {
  constructor(private _userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this._userService.getUser(id);
  }

  @Post()
  addUser(@Body() userData: User) {
    return this._userService.addUser(userData);
  }
}
