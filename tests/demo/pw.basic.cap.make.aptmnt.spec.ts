import {test, expect} from '@playwright/test';

test.describe("Login functionality", () => {

    test.beforeEach("Go to the login page", async ({page}) => {
        // 1. Launch URL
        await page.goto("https://katalon-demo-cura.herokuapp.com/")
        await expect(page).toHaveTitle("CURA Healthcare Service")
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service")

        // 2. Click on Make Appointment
        // await page.getByRole("link", {name: "Make Appointment"}).press("Enter") // Press
        await page.getByRole("link", {name: "Make Appointment"}).dblclick() // Double click
        await expect(page.getByText("Please login to make")).toBeVisible()
    })

    test.afterEach("Take screenshot on failure", async ({page}, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            const screenshot = await page.screenshot({ path: `screenshots/${testInfo.title}.png`, fullPage: true });
            await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
        }
    })

    test("Login with valid cred", async ({ page }) => {
        // 3. Success Login
        await page.getByLabel("Username").fill("John Doe")
        await page.locator("#txt-password").fill("ThisIsNotAPassword")
        await page.getByRole("button", {name: "Login"}).press("Enter") // Press

        // 4. Assert
        const actualSuccessfulLogin = "Make Appointment"
        await expect(page.locator("h2")).toHaveText(actualSuccessfulLogin)
    })

    test("Login with invalid cred", async ({page}) => {

        // 3. Unsuccessful Login
        await page.getByLabel("Username").clear() // Clear
        // await page.getByLabel("Username").fill("John Smith") // Fill
        await page.getByLabel("Username").pressSequentially("John Smith", {delay: 100}) // Press Sequentially
        await page.getByLabel("Password").click()
        await page.getByRole("button", {name: "Login"}).click()

        // 4. Assert
        const actualSuccessfulLogin = "Login failed! Please ensure the username and password are valid."
        await expect(page.locator(".lead.text-danger")).toHaveText(actualSuccessfulLogin)
    })


});

test.describe("Create new appointment", () => {

    test.beforeEach("Go to the login page", async ({page}) => {
        // 1. Launch URL
        await page.goto("https://katalon-demo-cura.herokuapp.com/")
        await expect(page).toHaveTitle("CURA Healthcare Service")
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service")

        // 2. Click on Make Appointment
        // await page.getByRole("link", {name: "Make Appointment"}).press("Enter") // Press
        await page.getByRole("link", {name: "Make Appointment"}).dblclick() // Double click
        await expect(page.getByText("Please login to make")).toBeVisible()

        // 3. Success Login
        await page.getByLabel("Username").fill("John Doe")
        await page.locator("#txt-password").fill("ThisIsNotAPassword")
        await page.getByRole("button", {name: "Login"}).press("Enter") // Press

        // 4. Assert
        const actualSuccessfulLogin = "Make Appointment"
        await expect(page.locator("h2")).toHaveText(actualSuccessfulLogin)
    })

    test.afterEach("Take screenshot on failure", async ({page}, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            const screenshot = await page.screenshot({ path: `screenshots/${testInfo.title}.png`, fullPage: true });
            await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
        }
    })

    test("Create new appointment with valid data", async ({page}) => {
        // 5. Create new appointment
        await page.getByRole("combobox", {name: "Facility"}).selectOption("Hongkong CURA Healthcare Center") // Dropdown
        await page.getByLabel("Apply for hospital readmission").check()  // Checkbox
        await expect(page.getByLabel("Apply for hospital read")).toBeVisible()

        await page.getByText("Medicaid").check() // Radio Button
        await expect(page.getByText("Medicaid")).toBeChecked()

        await page.locator("#txt_visit_date").fill("30/12/2024") // Date Picker
        await page.locator("#txt_comment").fill("This is a comment for the appointment.")
        await page.getByRole("button", {name: "Book Appointment"}).click()
    })
});