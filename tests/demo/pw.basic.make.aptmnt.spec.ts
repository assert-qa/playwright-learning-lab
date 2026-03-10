import {test, expect} from '@playwright/test';


// Learn Annotation
test.describe("Login functionality",{annotation: {type: "LOGIN", description: "JIRA-1234: Verify Login Functionality"}},() => {
    test.beforeEach(
        "Go to the login page", async ({page}, testInfo) => {
        // 1. Launch URL
        const envConfig = testInfo.project.use as any;

        await page.goto(envConfig.appURL)
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
        await page.getByLabel("Username").fill(process.env.TEST_USER_NAME)
        await page.locator("#txt-password").fill(process.env.TEST_PASSWORD)
        await page.getByRole("button", {name: "Login"}).press("Enter") // Press

        // // 4. Assert
        // const actualSuccessfulLogin = "Make Appointment"
        // await expect(page.locator("h2")).toHaveText(actualSuccessfulLogin)
    })
});

// Learn Tag
test.describe("Create new appointment", {tag: ["@smoke"]}, () => {
    test.beforeEach("Go to the login page", async ({page, browserName}, testInfo) => {
        // Skip the test for firefox
        test.skip(browserName === "firefox", "This test is not compatible with Firefox")

        // 1. Launch URL
        const envConfig = testInfo.project.use as any;
        await page.goto(envConfig.appURL)

        await expect(page).toHaveTitle("CURA Healthcare Service")
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service")

        // 2. Click on Make Appointment
        // await page.getByRole("link", {name: "Make Appointment"}).press("Enter") // Press
        await page.getByRole("link", {name: "Make Appointment"}).dblclick() // Double click
        await expect(page.getByText("Please login to make")).toBeVisible()

        // 3. Success Login
        await page.getByLabel("Username").fill(process.env.TEST_USER_NAME)
        await page.locator("#txt-password").fill(process.env.TEST_PASSWORD)
        await page.getByRole("button", {name: "Login"}).press("Enter") // Press

        // 3b. Get Login cookies
        const loginCookies = await page.context().cookies()
        // set Global variable for login cookies
        process.env.LOGIN_COOKIES = JSON.stringify(loginCookies)

        // // 4. Assert
        // const actualSuccessfulLogin = "Make Appointment"
        // await expect(page.locator("h2")).toHaveText(actualSuccessfulLogin)
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
        // 4b. Access the login cookies from environment variable and set it to the page context
        console.log(`>> Login Cookies: ${process.env.LOGIN_COOKIES}`)

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