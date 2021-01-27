export interface IHttpResult {
    error: string;
    message: [{ messages: IMessage[] }];
    statusCode: number;
}

export interface IMessage {
    id: MessageIds;
    message: string;
}

export enum MessageIds {
    'Auth.form.error.invalid'
}
