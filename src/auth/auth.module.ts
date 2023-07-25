import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { ConfigModule } from '@nestjs/config';
import { TokenService } from './token.service';

 
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({}), 
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, TokenService],
  exports: [AuthService]
})
export class AuthModule { }
