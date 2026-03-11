import {test as base} from '@playwright/test';

export type EnvConfig = {
    envName: string,
    appURL: string,
    nopCommerceWeb: string,
    dbConfig: {}
};

export const test = base.extend<EnvConfig>({
    envName: ["test", {option: true}],
    appURL: ["https://katalon-demo-cura.herokuapp.com/", {option: true}],
    nopCommerceWeb: ["https://admin-demo.nopcommerce.com/login?returnUrl=%2Fadmin%2F", {option: true}],
    dbConfig: [{}, {option: true}]
});