import { Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} 

  @Post('refresh') 
  async refreshToken() {
    return this.authService.refreshToken();
  }
} 
 