import {
  apiState,
  appSlice,
  auditState,
  bearerState,
  challengeState,
  contactState,
  credentialState,
  handleState,
  historyState,
  keyState,
  localeState,
  logState,
  otpState,
  profileState,
  roleState,
  serviceState,
  sessionState,
  systemState,
  userState,
  noteState,
} from './data/index.js';

const apiSlice = apiState.slice();
const auditSlice = auditState.slice();
const bearerSlice = bearerState.slice();
const contactSlice = contactState.slice();
const challengeSlice = challengeState.slice();
const credentialSlice = credentialState.slice();
const handleSlice = handleState.slice();
const historySlice = historyState.slice();
const keySlice = keyState.slice();
const localeSlice = localeState.slice();
const logSlice = logState.slice();
const otpSlice = otpState.slice();
const profileSlice = profileState.slice();
const roleSlice = roleState.slice();
const serviceSlice = serviceState.slice();
const sessionSlice = sessionState.slice();
const systemSlice = systemState.slice();
const userSlice = userState.slice();
const noteSlice = noteState.slice();

export const stateSlices = {
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

export default stateSlices;
