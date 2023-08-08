import { Body, Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { JwtRefreshGuard } from 'src/common/guards/jwt-refresh.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-access.guard';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const { access_token, refresh_token, user } = await this.authService.signup(createUserDto);
    res.cookie('refresh_token', refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.cookie('user_id', user.id, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).json({ access_token, name: user.name });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const { access_token, refresh_token, user } = await this.authService.login(req.user);
    res.cookie('refresh_token', refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.cookie('user_id', user.id, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).json({ access_token, name: user.name });
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refreshToken(@Request() req, @Res() res: Response) {
    const { access_token, refresh_token, user } = await this.authService.refreshToken(req.user.payload, req.user.refresh_token);
    res.cookie('refresh_token', refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.cookie('user_id', user.id, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).json({ access_token, name: user.name });
  }

  // @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req, @Res() res: Response) {
    let token = await this.authService.logout(req.cookies.user_id, req.cookies.refresh_token);
    res.clearCookie('refresh_token');
    res.clearCookie('user_id');
    res.sendStatus(200);
  }

  // @Post('test')
  // async test(@Body() paylod: PayloadDto) {
  //   payload.test
  //   return this.authService.test();
  // }
}
