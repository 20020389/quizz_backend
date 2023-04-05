import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthorizeGuard } from 'src/middleware/authrize.middware';
import { UserService } from 'src/services/user.service';

@Controller('/api/users')
export class UserController {
  constructor(private _userService: UserService) {}

  @UseGuards(AuthorizeGuard)
  @Get()
  getUser(@Req() req: NestRequest) {
    return this._userService.getUser(req.user.uid);
  }

  @UseGuards(AuthorizeGuard)
  @Post()
  addUser(@Req() req: NestRequest) {
    return this._userService.addUser(req.user);
  }
}
