import type { StateEntities } from '../state.types.js';
import {
  grantTask,
  GrantScope,
  GrantTask,
} from './grant/index.js';
import type {
  Contact,
  Profile,
  Role,
  System,
  User,
  Entity,
  Credential,
  Handle,
} from './entity/index.js';
import {
  userState,
  handleState,
  credentialState,
  roleState,
  profileState,
  contactState,
  systemState,
  auditState,
  historyState,
  entityCreate,
  historyMake,
} from './entity/index.js';
import { cryptoWeb } from '../io/index.js';
import { accountsGet } from '../accounts.js';
import { stateEntitiesCreate } from '../state.js';

export const dataInitial = async (): Promise<StateEntities> => {
  /**
   * ================================================================================
   * Roles to be assigned to users
   */
  const roles: Entity<Role>[] = [
    entityCreate(roleState.create({
      name: 'Administrator',
      description: 'Most permissive role for overall system configuration and maintenance.',
      color: '#cc0000',
      fsLimits: [-1, -1, -1],
      grants: [
        [systemState.key(), GrantScope.Global, grantTask(1, 1, 1, 1)],
        [auditState.key(), GrantScope.Global, grantTask(0, 1, 1, 1)],
        [historyState.key(), GrantScope.Global, grantTask(0, 1, 1, 1)],
        [userState.key(), GrantScope.Global, grantTask(1, 1, 1, 1)],
        [handleState.key(), GrantScope.Global, grantTask(1, 1, 1, 1)],
        [credentialState.key(), GrantScope.Global, grantTask(0, 1, 0, 1)],
        [roleState.key(), GrantScope.Global, grantTask(1, 1, 1, 1)],
        [profileState.key(), GrantScope.Global, grantTask(1, 1, 1, 1)],
        [contactState.key(), GrantScope.Global, grantTask(1, 1, 1, 1)],
      ],
    }), { committed: true, new: false }),
    entityCreate(roleState.create({
      name: 'Executive',
      description: 'Authoritative role for application configuration and maintenance.',
      color: '#3e3ee6',
      fsLimits: [-1, -1, -1],
      grants: [
        [auditState.key(), GrantScope.Global, grantTask(0, 1, 0, 0)],
        [historyState.key(), GrantScope.Global, grantTask(0, 1, 0, 0)],
        [userState.key(), GrantScope.Global, grantTask(1, 1, 1, 1)],
        [handleState.key(), GrantScope.Global, grantTask(0, 0, 1, 1)],
        [credentialState.key(), GrantScope.Global, grantTask(0, 1, 0, 1)],
        [roleState.key(), GrantScope.Global, grantTask(1, 1, 1, 1)],
        [profileState.key(), GrantScope.Global, grantTask(1, 1, 1, 1)],
        [contactState.key(), GrantScope.Global, grantTask(1, 1, 1, 1)],
      ],
    }), { committed: true, new: false }),
    entityCreate(roleState.create({
      name: 'Root',
      description: 'Basis for standard authenticated use of the application.',
      color: '#000000',
      fsLimits: [32, 64, 1024],
      grants: [
        [historyState.key(), GrantScope.Global, grantTask(0, 1, 0, 0)],
        [userState.key(), GrantScope.Owned, grantTask(0, 1, 1, 0)],
        [handleState.key(), GrantScope.Global, grantTask(0, 1, 0, 0)],
        [credentialState.key(), GrantScope.Owned, grantTask(0, 1, 0, 1)],
        [profileState.key(), GrantScope.Owned, grantTask(0, 1, 1, 0)],
        [profileState.key(), GrantScope.Global, grantTask(0, 1, 0, 0)],
        [contactState.key(), GrantScope.Owned, grantTask(0, 1, 1, 0)],
        [contactState.key(), GrantScope.Global, grantTask(0, 1, 0, 0)],
      ],
    }), { committed: true, new: false }),
    entityCreate(roleState.create({
      name: 'Anonymous',
      description: 'Permissions for accessing the application data without authentication.',
      color: '#000000',
      fsLimits: [0, 0, 0],
      grants: [
        [handleState.key(), GrantScope.Global, grantTask(0, 1, 0, 0)],
        [profileState.key(), GrantScope.Global, grantTask(0, 1, 0, 0)],
      ],
    }), { committed: true, new: false }),
  ];

  /**
   * ================================================================================
   * User Accounts
   */

  // Setup the accounts.
  const accounts = await accountsGet();

  const users: Entity<User>[] = [
    entityCreate(userState.create({
      handle: accounts.admin.handle,
      password: await cryptoWeb.passHash(accounts.admin.password),
      email: 'admin@email.addr',
      emailVerified: true,
      $roles: [roles[0].$id],
      $permits: [],
    }), { committed: true, new: false }),
    entityCreate(userState.create({
      handle: accounts.exec.handle,
      password: await cryptoWeb.passHash(accounts.exec.password),
      email: 'exec@email.addr',
      emailVerified: true,
      $roles: [roles[1].$id],
      $permits: [],
    }), { committed: true, new: false }),
    entityCreate(userState.create({
      handle: accounts.user.handle,
      password: await cryptoWeb.passHash(accounts.user.password),
      email: 'user@email.addr',
      emailVerified: true,
      $roles: [roles[2].$id],
      $permits: [],
    }), { committed: true, new: false }),
  ];

  /**
   * User handles.
   */
  const handles: Entity<Handle>[] = [
    entityCreate(handleState.create({
      name: users[0].handle,
      $subject: users[0].$id,
    })),
    entityCreate(handleState.create({
      name: users[1].handle,
      $subject: users[1].$id,
    })),
    entityCreate(handleState.create({
      name: users[2].handle,
      $subject: users[2].$id,
    })),
  ];

  /**
   * ================================================================================
   * User credentials
   */
  const credentials: Entity<Credential>[] = [
    entityCreate(
      accounts.admin.credential,
      { $owner: users[0].$id, committed: true, new: false },
    ),
    entityCreate(
      accounts.exec.credential,
      { $owner: users[1].$id, committed: true, new: false },
    ),
    entityCreate(
      accounts.user.credential,
      { $owner: users[2].$id, committed: true, new: false },
    ),
  ];

  users[0].$credentials.push(credentials[0].$id);
  users[1].$credentials.push(credentials[1].$id);
  users[2].$credentials.push(credentials[2].$id);

  /**
   * ================================================================================
   * User contacts.
   */
  const contacts: Entity<Contact>[] = [
    entityCreate(contactState.create({
      name: 'Administrator Contact',
      emails: [users[0].email as string],
    }), { $owner: users[0].$id, committed: true, new: false }),
    entityCreate(contactState.create({
      name: 'Executive Contact',
      emails: [users[1].email as string],
    }), { $owner: users[1].$id, committed: true, new: false }),
    entityCreate(contactState.create({
      name: 'User Contact',
      emails: [users[2].email as string],
    }), { $owner: users[2].$id, committed: true, new: false }),
  ];

  /**
   * ================================================================================
   * User profiles.
   */
  const profiles: Entity<Profile>[] = [
    entityCreate(profileState.create({
      $user: users[0].$id,
      $contact: contacts[0].$id,
      nameDisplay: 'Administrator',
    }), { $owner: users[0].$id, committed: true, new: false }),
    entityCreate(profileState.create({
      $user: users[1].$id,
      $contact: contacts[1].$id,
      nameDisplay: 'Executive',
    }), { $owner: users[1].$id, committed: true, new: false }),
    entityCreate(profileState.create({
      $user: users[2].$id,
      $contact: contacts[2].$id,
      nameDisplay: 'User',
    }), { $owner: users[2].$id, committed: true, new: false }),
  ];

  /**
   * ================================================================================
   * System settings.
   */
  const systems: Entity<System>[] = [
    entityCreate(systemState.create({
      name: 'Core System',
      handle: 'core',
      $adminRole: roles[0].$id,
      $execRole: roles[1].$id,
      $anonymousRole: roles[3].$id,
      $initialRoles: [roles[2].$id],
    }), { committed: true, new: false }),
  ];

  const stateEntitiesInital: StateEntities = {
    [roleState.key()]: roles,
    [userState.key()]: users,
    [handleState.key()]: handles,
    [credentialState.key()]: credentials,
    [contactState.key()]: contacts,
    [profileState.key()]: profiles,
    [systemState.key()]: systems,
  };

  /**
   * Create this initial history.
   */
  const stateEntities: StateEntities = {
    ...stateEntitiesInital,
    ...stateEntitiesCreate({
      [historyState.key()]: historyMake(stateEntitiesInital, GrantTask.Create),
    }, { committed: true, new: false }),
  };

  return stateEntities;
};

export default dataInitial;
