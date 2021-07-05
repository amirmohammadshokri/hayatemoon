export const environment = {
  production: true,
  SSoConfiguration: {
    stsServer: 'https://beta-identity.gozarino.com',
    redirectUrl: 'https://beta-demo.gozarino.com',
    postLogoutRedirectUri: 'https://beta-demo.gozarino.com',
    clientId: 'Gashtineh-adminPanel-client',
    scope: 'openid profile offline_access Gashtineh-api roles',
    secret: '3FA5DBA3-3EB0-4049-8E58-FDA932F5F0B0',
    responseType: 'code',
    silentRenew: true,
    silentRenewUrl: 'https://beta-demo.gozarino.com/silent-renew.html'
  },
};
