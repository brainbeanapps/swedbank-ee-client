import * as cheerio from 'cheerio';
import * as request from 'request-promise';
import * as toughCookie from 'tough-cookie';

import {BaseSession} from './baseSession';
import {Session} from './session';

export class BusinessSession extends BaseSession {
    public static readonly SIGNIN_ENDPOINT = '/business/d2d/start';
    public static readonly SIGNIN_PAGEID = BaseSession.makePageId(BusinessSession.SIGNIN_ENDPOINT);

    private _sessionId: string = null;
    private _navForm: {[key: string]: any} = null;

    public async signinUsingPinCode(userId: string, pinCode: string): Promise<void> {
        const signinPage = await request({
            jar: request.jar(this._cookiesStore),
            method: 'GET',
            uri: this.makeUri(BusinessSession.SIGNIN_ENDPOINT),
        });
        const signinDom = cheerio.load(signinPage);
        const signinForm = signinDom('#loginForm');

        let signinFormData: {[attr: string]: any} = {};
        let userIdInputField: CheerioElement;
        const signinFormInputFields = signinForm.find('input');
        for (const formInputField of signinFormInputFields.toArray()) {
            const fieldId = formInputField.attribs.id;
            const fieldName = formInputField.attribs.name;
            const fieldValue = formInputField.attribs.value;

            if (fieldName === undefined) {
                continue;
            }

            if (fieldId === 'userId') {
                userIdInputField = formInputField;
                continue;
            }

            if (fieldValue === undefined || fieldValue === null) {
                signinFormData[fieldName] = '';
                continue;
            }

            signinFormData[fieldName] = fieldValue;
        }

        signinFormData.loginType = 4;
        signinFormData.timestamp = new Date().getTime();
        signinFormData.hnzrd_redirId = '';
        signinFormData[userIdInputField.attribs.name] = userId;
        signinFormData[BusinessSession.getPasswordFieldName(signinPage)] = pinCode;

        const signinFormAction = signinForm.attr('action');
        const signinFormMethod = (signinForm.attr('method') || 'get').toUpperCase();

        const response = await request({
            formData: signinFormData,
            jar: request.jar(this._cookiesStore),
            method: signinFormMethod,
            resolveWithFullResponse: true,
            uri: this.makeUri(signinFormAction),
        });
        const responseDom = cheerio.load(response.body);

        const loginErrorMessageElement = responseDom('#loginErrorMessage');
        if (loginErrorMessageElement.length) {
            return Promise.reject({error: loginErrorMessageElement.text().trim()});
        }

        this._sessionId = response.headers.jsession;
        let navForm: {[key: string]: string} = {};
        const navFormInputFields = signinForm.find('input');
        for (const formInputField of navFormInputFields.toArray()) {
            const fieldId = formInputField.attribs.id;
            const fieldName = formInputField.attribs.name;
            const fieldValue = formInputField.attribs.value;

            if (fieldName === undefined) {
                continue;
            }

            if (fieldId === 'pageId' || fieldId === 'timestamp') {
                continue;
            }

            if (fieldValue === undefined || fieldValue === null) {
                signinFormData[fieldName] = '';
                continue;
            }

            signinFormData[fieldName] = fieldValue;
        }
        this._navForm = navForm;

        return Promise.resolve();
    }

    public async logout(): Promise<void> {
        if (this._sessionId === null) {
            return Promise.reject({});
        }

        let navFormData = Object.assign({}, this._navForm);
        navFormData.timestamp = new Date().getTime();
        navFormData.pageId = BusinessSession.SIGNIN_PAGEID;
        navFormData.field1 = 'pageId';
        navFormData.value1 = 'logout';

        const response = await request({
            formData: navFormData,
            jar: request.jar(this._cookiesStore),
            method: 'POST',
            qs: {
                forceLogout: true,
            },
            resolveWithFullResponse: true,
            uri: this.makeUri(BusinessSession.SIGNIN_ENDPOINT),
        });

        this._sessionId = null;
        this._navForm = null;

        return Promise.resolve();
    }

    protected makeUri(endpoint: string): string {
        let uri = Session.BASE_URL + endpoint;
        if (this._sessionId) {
            uri += ';jsessionid=' + this._sessionId;
        }
        return uri;
    }

    private static getPasswordFieldName(htmlContent: string): string {
        const regExp = /var\s+loginbarOptions\s*=\s*({(?:\s*\w+:\s*.+\s*,?)+\s*})/g;
        const match = regExp.exec(htmlContent);
        const code = 'return ' + match[1] + ';';
        const options: {[key: string]: any} = new Function(code.toString())();

        return options.authPwdName;
    }
}
