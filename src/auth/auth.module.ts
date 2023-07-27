import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { ConfigModule } from '@nestjs/config';
import { TokenService } from './token.service';
import { MailService } from './mail.service';
import { Token, TokenSchema } from './schemas/token.schema';
import { AuthController } from './auth.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, TokenService, MailService],
  exports: [AuthService]
})
export class AuthModule { }
