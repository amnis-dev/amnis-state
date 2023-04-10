const emailTemplates = {
/**
 * Template for sending a one-time passcode.
 *
 * Examples
 * ```
 * onetimePasscode('123456', '10 minutes');
 * ```
 */
  onetimePasscode: (code: string, lifetime: string) => `\
Your one-time passcode is ${code}.
 
This code will expire in ${lifetime}.\
`,
};

/**
 * Gets send templates.
 */
export const emailGetTemplate = (key: keyof typeof emailTemplates) => emailTemplates[key];

export default emailGetTemplate;

/**
 * Sets a new template or overrites one.
 */
// export const setSendTemplate = (key: string, template: SendTemplate) => {
//   sendTemplates[key] = template;
// };
