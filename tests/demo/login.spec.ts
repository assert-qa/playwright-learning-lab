import {test, expect} from '@playwright/test';

test('Login with valid credentials', {
    annotation: {
        type: 'Login Test',
        description: 'This test verifies the login functionality of the application.',
    },
}, async ({ page }) => {
    // 1. Launch URL
    await page.goto('https://katalon-demo-cura.herokuapp.com/')
    await expect(page).toHaveTitle("CURA Healthcare Service")
    // 2. Click on Make Appointment
    await page.locator("#btn-make-appointment").click()
    // 3. Fill in username and password and click Login
    await page.locator("#txt-username").fill("John Doe")
    await page.locator("#txt-password").fill("ThisIsNotAPassword")
    await page.locator("#btn-login").click()

    // 4. Assert if the login was successful by checking for the presence of the appointment form
    const actualSuccessfulLogin = "Make Appointment"
    await expect(page.locator("div[class='col-sm-12 text-center'] h2")).toHaveText("Make Appointment")
});

test('Login with invalid credentials', {
    annotation: {
        type: 'Login Test',
        description: 'This test verifies the login functionality of the application.',
    },
}, async ({ page }) => {
    // 1. Launch URL
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await expect(page).toHaveTitle("CURA Healthcare Service")
    // 2. Click on Make Appointment
    await page.locator("#btn-make-appointment").click()
    // 3. Fill in username and password and click Login
    await page.locator("#txt-username").fill("John Smith")
    await page.locator("#txt-password").fill("ThisIsNotAPassword")
    await page.locator("#btn-login").click()

    // 4. Assert if the login was successful by checking for the presence of the appointment form
    const actualSuccessfulLogin = "Login failed! Please ensure the username and password are valid."
    await expect(page.locator(".lead.text-danger")).toHaveText("Login failed! Please ensure the username and password are valid.")
});