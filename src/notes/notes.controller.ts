import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
    constructor(
        private readonly notesService: NotesService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Request() req, @Body() createNoteDto: CreateNoteDto) {
        console.log('Creating...');
        return this.notesService.create(createNoteDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    update(@Request() req, @Body() updateNoteDto: UpdateNoteDto) {
        console.log('Updating...');
        return this.notesService.update(updateNoteDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    delete(@Request() req, @Body() { id }) {
        console.log('Deleting...'); 
        return this.notesService.delete(id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Request() req) {
        return this.notesService.getAll(req.user);
    }
}
