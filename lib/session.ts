import * as toughCookie from 'tough-cookie';

export interface Session {
    getCookiesStore(): toughCookie.Store;
}

export namespace Session {
    export const BASE_URL = 'https://www.swedbank.ee';
}
