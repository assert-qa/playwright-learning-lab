import {test, expect} from '@playwright/test';

// Learn Annotation
test.describe("Login functionality",{annotation: {type: "LOGIN", description: "JIRA-1234: Verify Login Functionality"}},() => {
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

    test(
        "Login with valid creds", async ({ page }) => {
        // 3. Success Login
        await page.getByLabel("Username").fill("John Doe")
        await page.locator("#txt-password").fill("ThisIsNotAPassword")
        await page.getByRole("button", {name: "Login"}).press("Enter") // Press

        // 4. Assert
        const actualSuccessfulLogin = "Make Appointment"
        await expect(page.locator("h2")).toHaveText(actualSuccessfulLogin)
    })
});

// Learn Tag
test.describe("Create new appointment", {tag: ["@smoke"]}, () => {
    test.beforeEach("Go to the login page", async ({page, browserName}) => {
        // Skip the test for firefox
        test.skip(browserName === "firefox", "This test is not compatible with Firefox")

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

    // Skip the test for firefox
    test("Create new appointment with valid data", async ({page}, testInfo) => {
        /**
         * Add custom screenshot at test scope level
         */
        let fullPageLoginScreenshot = await page.screenshot({ fullPage: true});
        await testInfo.attach("Login Page", {
            body: fullPageLoginScreenshot,
            contentType: "image/png"
        });

        // 5. Create new appointment
        await page.getByRole("combobox", {name: "Facility"}).selectOption("Hongkong CURA Healthcare Center") // Dropdown
        await page.getByLabel("Apply for hospital readmission").check()  // Checkbox
        await expect(page.getByLabel("Apply for hospital read")).toBeVisible()

        await page.getByText("Medicaid").check() // Radio Button
        await expect(page.getByText("Medicaid")).toBeChecked()

        // await page.locator("#txt_visit_date").fill("30/12/2024") // Date Picker
        await page.locator("#txt_comment").fill("This is a comment for the appointment.")
        await page.getByRole("button", {name: "Book Appointment"}).click()
    })
});