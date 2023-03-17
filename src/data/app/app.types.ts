/**
 * Client application settings and data.
 */
export interface App {
  /**
   * Current route location of the application.
   */
  routeLocation: string;

  /**
   * Sets the theme of the application.
   * If unset, the default is used.
   */
  theme?: string;
}
