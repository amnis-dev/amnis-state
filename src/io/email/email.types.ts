/**
 * Email template function.
 */
export type EmailTemplate = (...args: string[]) => void;

/**
 * Properties of an email.
 */
export interface EmailSendProps {
  /**
   * The recipient of the email.
   */
  to: string;

  /**
   * The verified sender of this email.
   */
  from: string;

  /**
   * Name of the sender.
   */
  fromName?: string;

  /**
   * Email subject.
   */
  subject: string;

  /**
   * Text version of the email.
   */
  text: string;

  /**
   * HTML version of the email.
   */
  html?: string;
}

/**
 * Emailer method.
 */
export type EmailSend = (email: EmailSendProps) => Promise<boolean>;

/**
 * I/O interface for sending emails, texts, or other types of communication methods.
 */
export interface Email {
  send: EmailSend;
}
