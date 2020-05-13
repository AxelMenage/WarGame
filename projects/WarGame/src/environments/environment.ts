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

  // --- Friends ---
  friendsUrl: 'friend',

  // --- Games ---
  gamesUrl: 'game',
  getGamesUrl: 'game/getgames',
  changeGameStateUrl: 'game/changestate',
  canAccessGameUrl: 'game/canaccess',

  // --- Ships ---
  shipsUrl: 'ship',
  allShipsUrl: 'ship/all',

  // --- Positions ---
  positionsUrl: 'position',
  getPositionByUserAndGameUrl: 'position/getbyuserandgame'
};