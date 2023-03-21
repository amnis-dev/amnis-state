import {
  apiSlice,
  appSlice,
  auditState,
  bearerSlice,
  challengeSlice,
  contactState,
  credentialState,
  handleState,
  historyState,
  keyState,
  localeState,
  logState,
  otpSlice,
  profileState,
  roleState,
  serviceState,
  sessionState,
  systemState,
  userState,
  noteState,
} from './data/index.js';

const auditSlice = auditState.slice();
const contactSlice = contactState.slice();
const credentialSlice = credentialState.slice();
const handleSlice = handleState.slice();
const historySlice = historyState.slice();
const keySlice = keyState.slice();
const localeSlice = localeState.slice();
const logSlice = logState.slice();
const profileSlice = profileState.slice();
const roleSlice = roleState.slice();
const serviceSlice = serviceState.slice();
const sessionSlice = sessionState.slice();
const systemSlice = systemState.slice();
const userSlice = userState.slice();
const noteSlice = noteState.slice();

export const slices = {
  [apiSlice.name]: apiSlice,
  [appSlice.name]: appSlice,
  [auditSlice.name]: auditSlice,
  [bearerSlice.name]: bearerSlice,
  [challengeSlice.name]: challengeSlice,
  [contactSlice.name]: contactSlice,
  [credentialSlice.name]: credentialSlice,
  [handleSlice.name]: handleSlice,
  [keySlice.name]: keySlice,
  [historySlice.name]: historySlice,
  [localeSlice.name]: localeSlice,
  [logSlice.name]: logSlice,
  [noteSlice.name]: noteSlice,
  [otpSlice.name]: otpSlice,
  [profileSlice.name]: profileSlice,
  [roleSlice.name]: roleSlice,
  [serviceSlice.name]: serviceSlice,
  [sessionSlice.name]: sessionSlice,
  [systemSlice.name]: systemSlice,
  [userSlice.name]: userSlice,
};

export default slices;
