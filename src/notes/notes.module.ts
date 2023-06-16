import { Module, forwardRef } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './schemas/notes.schema';
import { User, UserSchema } from 'src/users/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Note.name, schema: NoteSchema },
      { name: User.name, schema: UserSchema }
    ]),
    forwardRef(() => AuthModule)
  ],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule { }
