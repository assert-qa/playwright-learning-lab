import {expect, type Page} from "@playwright/test";
import CommonPage from "./common.page";
import {log} from "../helpers/logger";

export default class HomePage extends CommonPage {
    // Constructor
    constructor(page: Page){
        super(page);
    }

    // Elements
    get userEmail(){
        return this.page.locator("//input[@id='Email']")
    }

    get password(){
        return this.page.locator("//input[@id='Password']");
    }

    get loginButton(){
        return this.page.locator("//button[normalize-space()='Log in']");
    }

    // Methods

    async loginToNopeCommerceApp(url: string, email: string, password: string){
        await log("info", "Logging in as admin")
        await log("info", `Navigating to the URL: ${url}`)

        await this.navigateTo(url);
        await this.typeInfo(this.userEmail, email);
        await this.typeInfo(this.password, password);
        await this.click(this.loginButton);
    }
}