import { uid } from '../../../core/index.js';
import { entitySliceCreate } from '../entity.slice.js';
import type { Note, NoteBase, NoteCreator } from './note.types.js';

const noteKey = 'note';

export const noteBase: NoteBase = {
  $subject: uid(''),
  text: '',
};

export function noteCreator(
  note: NoteCreator,
): Note {
  return {
    ...noteBase,
    ...note,
    $id: uid(noteKey),
  };
}

export const noteState = entitySliceCreate<Note, NoteCreator>({
  key: noteKey,
  creator: noteCreator,
});
