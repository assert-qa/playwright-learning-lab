import {test, expect} from '@playwright/test';

// Learn Annotation
test.describe("Login functionality",() => {
    test.beforeEach(
        "Go to the login page", async ({page}) => {
            // 1. Launch URL
            await page.goto("https://katalon-demo-cura.herokuapp.com/")
            await expect(page).toHaveTitle("CURA Healthcare Service")
            await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service")

            // 2. Click on Make Appointment
            // await page.getByRole("link", {name: "Make Appointment"}).press("Enter") // Press
            await page.getByRole("link", {name: "Make Appointment"}).dblclick() // Double click
            await expect(page.getByText("Please login to make")).toBeVisible()
        })

    // Learn Auto-waiting
    test(
        "Should login successfully", async ({ page }) => {
            // Auto-waiting
            let userName = page.getByLabel("username")
            await userName.fill("John Doe")


            // 3. Success Login
            // await page.getByLabel("Username").fill("John Doe")
            // await page.locator("#txt-password").fill("ThisIsNotAPassword")
            // await page.getByRole("button", {name: "Login"}).press("Enter") // Press

            // 4. Assert
            const actualSuccessfulLogin = "Make Appointment"
            await expect(page.locator("h2")).toHaveText(actualSuccessfulLogin)
        })
});