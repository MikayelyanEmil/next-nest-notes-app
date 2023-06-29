import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteModel } from './schemas/notes.schema';
import mongoose, { Model } from 'mongoose';
import { User, UserModel } from 'src/users/schemas/users.schema';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
    constructor(
        @InjectModel(Note.name) private noteModel: Model<NoteModel>,
        @InjectModel(User.name) private userModel: Model<UserModel>
    ) { }

    // async create(createNoteDto: CreateNoteDto, user): Promise<Note> {
    //     const note = new this.noteModel(createNoteDto);
    //     await note.save();
    //     user.notes.push(note.id);
    //     await user.save();
    //     return note;
    // }

    async test(createNoteDto: CreateNoteDto, user): Promise<Note> {
        const { id, ...note } = createNoteDto;
        console.log(note);
        console.log(id);
        return await this.noteModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { title: 'titlle', description: 'desscc' }, { upsert: true });
    }

    async delete(id) {
        return await this.noteModel.findByIdAndDelete(id, { returnDocument: 'after' });
    }

    async getAll(user): Promise<Note[]> {
        await user.populate('notes');
        return user.notes;
    }

}
