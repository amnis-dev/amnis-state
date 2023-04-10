import { nanoid } from '@reduxjs/toolkit';
import { dateJSON } from '../../core/index.js';
import type { DateJSON } from '../../core/index.js';
import type { Emailer, EmailerSendProps } from './emailer.types.js';

export interface EmailerInboxItem extends EmailerSendProps {
  /**
   * Date-time received.
   */
  received: DateJSON;
}

export type Emailerbox = Record<string, EmailerInboxItem[]>;

export type EmailerSendCallback = (inbox: Emailerbox) => void;

export type EmailerSendUnsubscribe = () => void;

let emailerboxes: Emailerbox = {};

const emailerSendSubcribers: { [key: string]: EmailerSendCallback } = {};

export const emailerboxStorage = () => emailerboxes;

export const emailerboxClear = () => { emailerboxes = {}; };

export const emailerSendSubscribe = (callback: EmailerSendCallback): EmailerSendUnsubscribe => {
  const uid = nanoid();
  emailerSendSubcribers[uid] = callback;
  return () => {
    delete emailerSendSubcribers[uid];
  };
};

export const emailerMemory: Emailer = {
  /**
   * Sends an emailer.
   */
  send: async (emailer) => {
    const emailerboxKey = emailer.to;
    if (!emailerboxes[emailerboxKey]) {
      emailerboxes[emailerboxKey] = [];
    }
    emailerboxes[emailerboxKey].push({
      ...emailer,
      received: dateJSON(),
    });

    Object.values(emailerSendSubcribers).forEach((listener) => listener(emailerboxes));

    return true;
  },
};

export default emailerMemory;
