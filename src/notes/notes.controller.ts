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
        // private readonly authService: AuthService
    ) {} 

    @UseGuards(JwtAuthGuard) 
    @Post('create')
    create(@Request() req, @Body() createNoteDto: CreateNoteDto) {
        // return this.notesService.create(createNoteDto, req.user);
        console.log(createNoteDto);
        
        return this.notesService.test(createNoteDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    delete(@Request() req, @Body() {id}) {
        return this.notesService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Request() req) {
        return this.notesService.getAll(req.user);
    }
    
}
