import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteModel } from './schemas/notes.schema';
import { Model } from 'mongoose';
import { User, UserModel } from 'src/users/schemas/users.schema';

@Injectable()
export class NotesService {
    constructor(
        @InjectModel(Note.name) private noteModel: Model<NoteModel>,
        @InjectModel(User.name) private userModel: Model<UserModel>
    ) { }

    async create(createNoteDto: CreateNoteDto, user): Promise<Note> {
        const note = new this.noteModel(createNoteDto);
        await note.save();
        user.notes.push(note.id);
        await user.save();
        return note;
    }

    async getAll(user): Promise<Note[]> {
        await user.populate('notes');
        return user.notes;
    }

}
