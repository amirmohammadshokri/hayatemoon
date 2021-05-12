import { Injectable } from '@angular/core';
import { OidcConfigService } from 'angular-auth-oidc-client';
import { environment } from '../../environments/environment';

@Injectable()
export class AppInitService {

    constructor(private oidcConfigService: OidcConfigService) { }

    Init(): Promise<any> {
        const oidcConfigService = this.oidcConfigService;
        const promise = new Promise((resolve, reject) => {
            const result = oidcConfigService.withConfig(environment.SSoConfiguration);
            resolve(result);
        });
        return promise;
    }
}
