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

    async create(createNoteDto: CreateNoteDto, user): Promise<Note> {
        const note = new this.noteModel({...createNoteDto, author: user.email});
        await note.save();
        user.notes.push(note.id);
        await user.save();
        return note;
    }

    async update(updateNoteDto: UpdateNoteDto, user): Promise<Note> {
        return await this.noteModel.findByIdAndUpdate(updateNoteDto.id, { ...updateNoteDto, author: user.email }).exec();
    }

    async delete(id) {
        return await this.noteModel.findByIdAndDelete(id, { returnDocument: 'after' }).exec();
    }

    async getAll(user): Promise<Note[]> {
        await user.populate('notes');
        return user.notes;
    }

}
