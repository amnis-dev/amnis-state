import { uid } from '../../../core/index.js';
import { entitySliceCreate } from '../entity.slice.js';
import type { Contact, ContactBase, ContactCreator } from './contact.types.js';

const contactKey = 'contact';

export const contactBase = (): ContactBase => ({
  name: 'Unknown Contact',
  phones: [],
  emails: [],
  socials: [],
});

export function contactCreator(
  contact: ContactCreator,
): Contact {
  return {
    ...contactBase(),
    ...contact,
    $id: uid(contactKey),
  };
}

export const contactState = entitySliceCreate({
  key: contactKey,
  creator: contactCreator,
});
