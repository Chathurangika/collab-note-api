import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './schemas/note.schema';
import { NotesController } from './notes.controller';
import { NoteRepository } from './repositories/note.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    UserModule
  ],
  providers: [NotesService,NoteRepository],
  controllers: [NotesController],
})
export class NotesModule {}
