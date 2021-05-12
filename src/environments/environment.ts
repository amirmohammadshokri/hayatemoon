// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SSoConfiguration: {
    stsServer: 'https://beta-identity.gozarino.com',
    redirectUrl: 'https://localhost:4200',
    postLogoutRedirectUri: 'https://localhost:4200',
    clientId: 'Gashtineh-adminPanel-client',
    scope: 'openid profile offline_access Gashtineh-api roles',
    secret: '30CD0959-1F8A-4042-961E-0E699034AE00',
    responseType: 'code',
    silentRenew: true,
    silentRenewUrl: 'https://localhost:4200/silent-renew.html'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
