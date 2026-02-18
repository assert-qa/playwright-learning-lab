import {test, expect} from '@playwright/test';

test.describe("List of inventory Test", () => {
    test.beforeEach("Login with valid credentials", async ({page}) => {
        await page.goto("https://www.saucedemo.com/")

        await page.locator("#user-name").fill("standard_user")
        await page.locator("#password").fill("secret_sauce")

        await page.locator("#login-button").click()

        // await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page).toHaveURL(/.*\/inventory/)
    })

    test("Verify the inventory page", async ({page}) => {
        let productsElements = page.locator(".inventory_item")

        await expect(productsElements).toHaveCount(6)

        let totalProducts = await productsElements.count()

        for (let i = 0; i < totalProducts; i++){
            let elementNode = productsElements.nth(i)

            let productName = await elementNode.locator(".inventory_item_name").innerText()

            let productPrice = await elementNode.locator(".inventory_item_price").innerText()

            console.log(productName + " - " + productPrice)
        }
    })
});