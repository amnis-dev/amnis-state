/**
 * Emailer template function.
 */
export type EmailerTemplate = (...args: string[]) => void;

/**
 * Properties of an email.
 */
export interface EmailerSendProps {
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
   * Emailer subject.
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
 * Emailerer method.
 */
export type EmailerSend = (email: EmailerSendProps) => Promise<boolean>;

/**
 * I/O interface for sending emails, texts, or other types of communication methods.
 */
export interface Emailer {
  send: EmailerSend;
}
