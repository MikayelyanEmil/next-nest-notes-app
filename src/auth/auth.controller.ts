import { Body, Controller, Get, Post, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { JWTRefreshGuard } from 'src/common/guards/jwt-refresh.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    // const { access_token, refresh_token, user } = await this.authService.signup(createUserDto);
    return this.authService.refreshToken();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JWTRefreshGuard)
  @Post('refresh')
  async refreshToken() {
    return this.authService.refreshToken();
  }
}
