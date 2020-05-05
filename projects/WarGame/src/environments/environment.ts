// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:44364/api/',

  // --- Users ---
  userUrl: 'user',
  verifyTokenUrl: 'user/verifytoken',
  authenticationUrl: 'user/authenticate',
  forgotPasswordUrl: 'user/forgotpassword',
  reinitPasswordUrl: 'user/reinitpassword',
  getUserStatsUrl: 'user/stats',
};