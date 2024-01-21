import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { NotesDto } from './dto/notes.dto';
import { NoteRepository } from './repositories/note.repository';
import { UserDocument } from '../user/schemas/user.schema';
import { CommonUser } from 'src/common/schema/common-user.schema';
import { ShareNoteDto } from './dto/share-note.dto';
import { Types } from 'mongoose';
import { UserService } from '../user/user.service';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteContentUpdator } from 'src/common/enum';
import {
  NoteContentUpdate,
  NoteContentUpdateDocument,
} from './schemas/note-content-update.schema';

@Injectable()
export class NotesService {
  constructor(
    private readonly noteRepository: NoteRepository,
    private readonly userService: UserService,
  ) {}

  createOne(user: UserDocument, data: NotesDto) {
    const commonUser: CommonUser = {
      _id: user._id,
      fullName: `${user.firstName} ${user.lastName}`,
    };

    let contentUpdates: NoteContentUpdateDocument[] = [];

    contentUpdates.push({
      content: data.content,
      from: NoteContentUpdator.OWNER,
      order: 1,
      editedBy: commonUser,
    } as NoteContentUpdateDocument);

    return this.noteRepository.createOne({
      title: data.title,
      owner: commonUser,
      sharedUsers: [],
      contentUpdates: contentUpdates,
    });
  }

  async shareNote(data: ShareNoteDto) {
    const note = await this.noteRepository.findOne(
      new Types.ObjectId(data.noteId),
    );

    if (note == null) {
      throw new BadRequestException('Note not found');
    }

    const noteId = new Types.ObjectId(data.noteId);
    const shareUsers: Types.ObjectId[] = [];
    const sharedUsers = note.sharedUsers.map((id) => {
      return id.toString();
    });

    data.userId.forEach((id) => {
      if (!sharedUsers.includes(id)) {
        shareUsers.push(new Types.ObjectId(id));
      }
    });

    return this.noteRepository.shareNote(noteId, shareUsers);
  }

  async findOne(user: UserDocument, id: Types.ObjectId) {
    const note = await this.noteRepository.findOne(id);

    if (note == null) {
      throw new BadRequestException('Note not found');
    }

    note.sharedUsers.push(note.owner._id);

    if (!note.sharedUsers.includes(user._id)) {
      throw new ForbiddenException('Forbidden Access.');
    }
    return note;
  }

  async addContent(
    user: UserDocument,
    noteId: Types.ObjectId,
    data: UpdateNoteDto,
  ) {
    const note = await this.noteRepository.findOne(noteId);

    if (!note) {
      throw new BadRequestException('Note not found');
    }

    note.sharedUsers.push(note.owner._id);
    console.log(note.sharedUsers, user._id);
    if (!note.sharedUsers.includes(user._id)) {
      throw new ForbiddenException('Forbidden access');
    }

    const editor =
      note.owner._id === user._id
        ? NoteContentUpdator.OWNER
        : NoteContentUpdator.COLLBORATOR;
    const commonUser: CommonUser = {
      _id: user._id,
      fullName: `${user.firstName} ${user.lastName}`,
    };
    const contentUpdate = note.contentUpdates;
    const contentUpdateDetails: NoteContentUpdate = {
      content: data.content,
      from: editor,
      order: contentUpdate.length + 1,
      editedBy: commonUser,
    };

    return this.noteRepository.addContent(note._id, contentUpdateDetails);
  }

  findAllUserNotes(userId: Types.ObjectId) {
    return this.noteRepository.findAllUserNotes(userId);
  }

  findAllSharedNotes(userId: Types.ObjectId) {
    return this.noteRepository.findAllSharedNotes(userId);
  }
}
