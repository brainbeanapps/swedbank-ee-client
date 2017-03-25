import * as toughCookie from 'tough-cookie';

import {Session} from './session';

export abstract class BaseSession implements Session {
    protected readonly _cookiesStore = new toughCookie.MemoryCookieStore();

    public getCookiesStore(): toughCookie.Store {
        return this._cookiesStore;
    }

    protected static makePageId(endpoint: string): string {
        if (endpoint[0] === '/') {
            endpoint = endpoint.substr(1);
        }
        if (endpoint[endpoint.length - 1] === '/') {
            endpoint = endpoint.substr(0, endpoint.length - 1);
        }

        return endpoint.replace('/', '.');
    }
}
