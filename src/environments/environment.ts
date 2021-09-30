// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { LogLevel } from "angular-auth-oidc-client";

export const environment = {
  production: false,
  SSoConfiguration: {
    stsServer: 'https://identity.gashtineh.com',
    redirectUrl: 'https://localhost:4200',
    postLogoutRedirectUri: 'https://localhost:4200',
    clientId: 'Gashtineh-adminPanel-client-test',
    scope: 'openid profile offline_access Gashtineh-api roles',
    secret: 'FDE4A2A7-8204-4946-9949-2625BE23EBDA',
    responseType: 'code',
    silentRenew: true,
    silentRenewUrl: 'https://localhost:4200/silent-renew.html',
    authority: 'https://identity.gashtineh.com',
    useRefreshToken: true,
    logLevel: LogLevel.Debug,
    automaticSilentRenew: true,
    trigger_authorization_result_event: true,
    history_cleanup_off: true
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