import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfig {
    private config = null;
    private env = null;
    constructor(private http: HttpClient) {
    }

    public getConfig(key: any): any {
        return this.config[key];
    }

    public getEnv(key: any): any {
        return this.env[key];
    }

    public load(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get('assets/app.config.json').subscribe((envResponse) => {
                this.config = envResponse;
                resolve(true);
            });
        });
    }
}
