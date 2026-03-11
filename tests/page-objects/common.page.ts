// Common Page merupakan class yang berisi method-method umum yang dapat digunakan di berbagai page object.
// Dengan menggunakan Common Page, kita dapat menghindari duplikasi kode dan meningkatkan maintainability dari test automation framework
import {expect, type Locator, type Page} from "@playwright/test";
import {log} from "../helpers/logger";

export default class CommonPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // All reusable actions
    async navigateTo(path: string) {
        await log("info", `Navigating to the path: ${path}`)
        await this.page.goto(path)
    }

    // Click action
    async click(ele: Locator){
        try {
            await expect(ele).toBeVisible({timeout: 10_000});
            await ele.click();
        } catch (error){
            await log("error", `Failed to click on the element: ${ele}, error: ${error}`)
            throw error;
        }
    }

    // Type action
    async typeInfo(ele: Locator, text: string){
        try {
            await expect(ele).toBeVisible({timeout: 10_000});
            await ele.clear();
            await ele.fill(text);

            await log("info", `Typing text: ${text} into the element: ${ele}`)
        } catch (error) {
            await log("error", `Failed to type into the element: ${ele}, error: ${error}`)
            throw error;
        }
    }
}