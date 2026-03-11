import {test, expect} from '@playwright/test';
import {log} from "../helpers/logger";
import HomePage from "../page-objects/nopcommerce.home.page"

test("Login to Nopcommerce Web App", async ({page}, testInfo) => {
    // Create an instance of the HomePage class
    const homePage = new HomePage(page);

    // Env config
    const envConfig = testInfo.project.use as any

    // Login
    await homePage.loginToNopeCommerceApp(
        envConfig.nopCommerceWeb,
        process.env.NOP_EMAIL_ADMIN,
        process.env.NOP_PASSWORD_ADMIN);

    await log("info", "Login successful");
})