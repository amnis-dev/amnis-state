import type {
  EntityCreatorBase, EntityCreatorParams, Meta,
} from '../entity.types.js';
import type { UID } from '../../../core/index.js';
import type { Data } from '../../data.types.js';

/**
 * A message to aid memory about the historic change.
 */
export interface Note extends Data {
  /**
   * Subject this note is attached to.
   */
  readonly $subject: UID;

  /**
   * Textual content of the note.
   */
  text: string;
}

/**
 * Note properties excluding the extended entity properties.
 */
export type NoteBase = EntityCreatorBase<Note>;

/**
 * Base properties in order to create a log.
 */
export type NoteCreator = EntityCreatorParams<Note, '$subject' | 'text'>;

/**
 * Note collection meta data.
 */
export type NoteMeta = Meta<Note>;
