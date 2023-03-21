import {
  apiSlice,
  appSlice,
  auditSlice,
  bearerSlice,
  challengeSlice,
  contactSlice,
  credentialSlice,
  handleSlice,
  historySlice,
  keySlice,
  localeSlice,
  logSlice,
  otpSlice,
  profileState,
  roleSlice,
  serviceSlice,
  sessionSlice,
  systemSlice,
  userSlice,
  noteState,
} from './data/index.js';

const noteSlice = noteState.slice();
const profileSlice = profileState.slice('state');

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
