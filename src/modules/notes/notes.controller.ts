import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthenticatedUser } from 'src/common/authenticated-user.decorator';
import { UserDocument } from '../user/schemas/user.schema';
import { NotesDto } from './dto/notes.dto';
import { ShareNoteDto } from './dto/share-note.dto';
import { ObjectIdParam } from 'src/common/params';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {

  constructor(private readonly noteService: NotesService) { }


  @Post()
  async create(
    @AuthenticatedUser() user: UserDocument,
    @Body() createNoteDto: NotesDto,
  ) {

    const users = this.noteService.createOne(user, createNoteDto);
    return users;
  }

  @Post('share')
  async share(
    @AuthenticatedUser() user: UserDocument,
    @Body() data: ShareNoteDto,
  ) {
    return this.noteService.shareNote(data);
  }

  @Post(':id/add-content')
  async addContent(
    @Param() params: ObjectIdParam,
    @AuthenticatedUser() user: UserDocument,
    @Body() data: UpdateNoteDto,
  ) {
   
    return this.noteService.addContent(user,params.id,data);
  }

  @Get('user-notes')
  async findAllUserNotes(
    @AuthenticatedUser() user: UserDocument
  ) {
   
    return this.noteService.findAllUserNotes(user._id);
  }

  @Get('shared-notes')
  async findAllSharedNotes(
    @AuthenticatedUser() user: UserDocument
  ) {
    return this.noteService.findAllSharedNotes(user._id);
  }
  @Get(':id')
  async findOne(
    @Param() params: ObjectIdParam,
    @AuthenticatedUser() user: UserDocument,
  ) {
   
    return this.noteService.findOne(user,params.id);
  }
}
