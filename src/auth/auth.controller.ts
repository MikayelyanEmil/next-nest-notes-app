import { Body, Controller, Get, Post, UnauthorizedException, UseGuards, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { JwtRefreshGuard } from 'src/common/guards/jwt-refresh.guard';
import { AuthGuard } from '@nestjs/passport';
import { PayloadDto } from './dto/payload.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto, @Response() res) {
    const { access_token, refresh_token, user } = await this.authService.signup(createUserDto);
    res.cookie('refreshToken', refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    res.status(200).json({access_token, user});
  } 

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    const { access_token, refresh_token, user } = await this.authService.login(req.user);
    res.cookie('refreshToken', refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    res.status(200).json({access_token, user});
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refreshToken(@Request() req, @Response() res) {
    const {access_token, refresh_token, user} = await this.authService.refreshToken(req.user.payload, req.user.refresh_token);
    res.cookie('refreshToken', refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    res.status(200).json({access_token, user}); 
  }

  @Post('test') 
  async test(@Body() paylod: PayloadDto) {
    return this.authService.test();
  }
}
