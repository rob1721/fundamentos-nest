import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('/all')
  getUsers() {
    return 'all users';
  }

  @Get('/:id')
  getUser(@Param('id') userId: string) {
    return 'con /sas/' + userId;
  }

  @Post()
  createUser(@Body() payload: any) {
    return {
      error: '',
      message: payload,
      status: 201,
    };
  }
}
