export const environment = {
  production: true,
  SSoConfiguration: {
    stsServer: 'https://identity.gashtineh.com',
    redirectUrl: 'https://localhost:4200',
    postLogoutRedirectUri: 'https://localhost:4200',
    clientId: 'Gashtineh-adminPanel-client',
    scope: 'openid profile offline_access Gashtineh-api roles',
    secret: '3FA5DBA3-3EB0-4049-8E58-FDA932F5F0B0',
    responseType: 'code',
    silentRenew: true,
    silentRenewUrl: 'https://localhost:4200/silent-renew.html'
  },
};
