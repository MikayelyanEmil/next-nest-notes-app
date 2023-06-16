import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';



@Module({
  imports: [
    UsersModule, 
    AuthModule,
    MongooseModule.forRoot(`mongodb+srv://emil:dfgsap@userscluster.wqtwqdy.mongodb.net/test`),
    NotesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
