import {test as base} from '@playwright/test';

export type EnvConfig = {
    envName: string,
    appURL: string,
    dbConfig: {}
};

export const test = base.extend<EnvConfig>({
    envName: ["test", {option: true}],
    appURL: ["https://katalon-demo-cura.herokuapp.com/", {option: true}],
    dbConfig: [{}, {option: true}]
});