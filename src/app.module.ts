import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { ConfigModule } from '@nestjs/config';




@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`
    }), 
    UsersModule,   
    AuthModule, 
    MongooseModule.forRoot(process.env.MONGO),
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

