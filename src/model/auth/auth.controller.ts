import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user')
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto);
  }

  @Post('/login')
  async login(@Body() LoginDto: LoginDto) {
    return await this.authService.login(LoginDto);
  }
}
