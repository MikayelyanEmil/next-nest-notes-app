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
        const note = new this.noteModel({...createNoteDto, author: `${user.name}-${user.email}`});
        await note.save();
        user.notes.push(note.id);
        await user.save();
        return note;
    }

    async update(updateNoteDto: UpdateNoteDto, user): Promise<Note> {
        return await this.noteModel.findByIdAndUpdate(updateNoteDto.id, { ...updateNoteDto }).exec();
    }

    async delete(id, user) {
        let note = await this.noteModel.findById(id).exec();
        // user.notes.filter((n) => n != note.id);
        // console.log(await user.notes.findByIdAndDelete(id, { returnDocument: 'after' }).exec());
        // await user.save();
        return await this.noteModel.findByIdAndDelete(id, { returnDocument: 'after' }).exec();
    }

    async getAll(user) {
        await user.populate('notes');
        return { 
            user: user.name,
            notes: user.notes 
        };
    }

}
