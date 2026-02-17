import {test, expect} from '@playwright/test';

test.describe("Login functionality", () => {
    // Menghindari duplikasi untuk langkah 1 dan 2 pada setiap test case menggunakan hook beforeEach
    test.beforeEach("Go to the login page", async ({page}) => {
        // 1. Launch URL
        await page.goto("https://katalon-demo-cura.herokuapp.com/")
        await expect(page).toHaveTitle("CURA Healthcare Service")
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service")

        // 2. Click on Make Appointment
        await page.getByRole("link", {name: "Make Appointment"}).click()
        await expect(page.getByText("Please login to make")).toBeVisible()
    })

    test("Login with valid credentials", async ({ page }) => {
        // 3. Success Login
        await page.getByLabel("Username").fill("John Doe")
        await page.locator("#txt-password").fill("ThisIsNotAPassword")
        await page.getByRole("button", {name: "Login"}).click()

        // 4. Assert
        const actualSuccessfulLogin = "Make Appointment"
        await expect(page.locator("h2")).toHaveText(actualSuccessfulLogin)
    });

    test("Login with invalid credentials", async ({page}) => {

        // 3. Unsuccessful Login
        await page.getByLabel("Username").fill("John Smith")
        await page.getByLabel("Password").click()
        await page.getByRole("button", {name: "Login"}).click()

        // 4. Assert
        const actualSuccessfulLogin = "Login failed! Please ensure the username and password are valid."
        await expect(page.locator(".lead.text-danger")).toHaveText(actualSuccessfulLogin)
    })

})