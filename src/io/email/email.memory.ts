import { nanoid } from '@reduxjs/toolkit';
import { dateJSON } from '../../core/index.js';
import type { DateJSON } from '../../core/index.js';
import type { Email, EmailSendProps } from './email.types.js';

export interface EmailInboxItem extends EmailSendProps {
  /**
   * Date-time received.
   */
  received: DateJSON;
}

export type Emailbox = Record<string, EmailInboxItem[]>;

export type EmailSendCallback = (inbox: Emailbox) => void;

export type EmailSendUnsubscribe = () => void;

let emailboxes: Emailbox = {};

const emailSendSubcribers: { [key: string]: EmailSendCallback } = {};

export const emailboxStorage = () => emailboxes;

export const emailboxClear = () => { emailboxes = {}; };

export const emailSendSubscribe = (callback: EmailSendCallback): EmailSendUnsubscribe => {
  const uid = nanoid();
  emailSendSubcribers[uid] = callback;
  return () => {
    delete emailSendSubcribers[uid];
  };
};

export const emailMemory: Email = {
  /**
   * Sends an email.
   */
  send: async (email) => {
    const emailboxKey = email.to;
    if (!emailboxes[emailboxKey]) {
      emailboxes[emailboxKey] = [];
    }
    emailboxes[emailboxKey].push({
      ...email,
      received: dateJSON(),
    });

    Object.values(emailSendSubcribers).forEach((listener) => listener(emailboxes));

    return true;
  },
};

export default emailMemory;
