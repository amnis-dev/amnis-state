export type AppSystems = Record<string, string>;

/**
 * Client application settings and data.
 */
export interface App {
  /**
   * Possibly known locations of systems.
   */
  systems: AppSystems;

  /**
   * Key to use as the default system.
   */
  systemDefault?: keyof AppSystems;

  /**
   * Enable or disable data comparison when performing update actions.
   */
  dataCompare: boolean;

  /**
   * Save data to local storage.
   */
  dataSave: boolean;

  /**
   * Current route location of the application.
   */
  location: string;

  /**
   * Sets the theme of the application.
   * If unset, the default is used.
   */
  theme?: string;
}
