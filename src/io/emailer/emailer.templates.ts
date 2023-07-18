import type { EmailerTemplates } from './emailer.types.js';

const emailerTemplateOtp: EmailerTemplates['otp'] = ({ code, lifetime }) => `\
Your one-time passcode is ${code}.

This code will expire in ${lifetime}.\
`;

export const emailerTemplates: EmailerTemplates = {
  otp: emailerTemplateOtp,
};

export default emailerTemplates;
/**
 * Sets a new template or overrites one.
 */
// export const setSendTemplate = (key: string, template: SendTemplate) => {
//   sendTemplates[key] = template;
// };
