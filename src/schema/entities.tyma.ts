import type {
  Audit,
  Contact,
  Credential,
  Handle,
  History,
  Image,
  Locale,
  Log,
  Note,
  Profile,
  Role,
  Service,
  System,
  Session,
  User,
  Video,
  DataUpdate,
} from '../data/index.js';

export interface StateCreator {
  audit?: Audit[];
  contact?: Contact[];
  credential?: Credential[];
  handle?: Handle[];
  history?: History[];
  image?: Image[];
  locale?: Locale[];
  log?: Log[];
  note?: Note[];
  profile?: Profile[];
  role?: Role[];
  service?: Service[];
  system?: System[];
  user?: User[];
  session?: Session[];
  video?: Video[];
}

export interface StateUpdater {
  audit?: DataUpdate<Audit>[];
  contact?: DataUpdate<Contact>[];
  credential?: DataUpdate<Credential>[];
  history?: DataUpdate<History>[];
  image?: DataUpdate<Image>[];
  locale?: DataUpdate<Locale>[];
  log?: DataUpdate<Log>[];
  note?: DataUpdate<Note>[];
  profile?: DataUpdate<Profile>[];
  role?: DataUpdate<Role>[];
  service?: DataUpdate<Service>[];
  system?: DataUpdate<System>[];
  user?: DataUpdate<User>[];
  session?: DataUpdate<Session>[];
  video?: DataUpdate<Video>[];
}
