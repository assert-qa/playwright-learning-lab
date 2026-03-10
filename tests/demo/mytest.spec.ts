import {test, expect, devices} from '@playwright/test';
import constants from '../../data/constants.json';
import TestData from "../../data/test-data";

test("Should load homepage with correct title", async ({page}) => {
    // 1. Go to the homepage
    await page.goto('https://katalon-demo-cura.herokuapp.com/')
    // 2. Assert if the title is correct
    await expect(page).toHaveTitle("CURA Healthcare Service")
    // 3. Assert header text
    await expect(page.locator(".text-vertical-center h1")).toHaveText("CURA Healthcare Service")
});

test("Should demo fixtures", async ({page, browserName}, testInfo) => {
    // steps..
    console.log('Browser: ', browserName)

});

// Test multi-browser and devices
test("Should demo devices and parallel execution", async ({page, browserName}) => {
    console.log('Browser: ', browserName)
    // check devices
    console.log(`The list devices: ${Object.keys(devices)}`);

})

// Test parallel execution
test("Should demo parallel execution", {tag : '@demo'}, async ({page, browserName}) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/')
    console.log('Browser: ', browserName)
})

// How to use Static Data
test("Should demo static data", async ({page}) => {
    console.log(`Constant Data" ${JSON.stringify(constants.STATUS_CODE)}`)
})

// How to use Parameterization Data
test("Should demo parameterization data", async ({page}, testInfo) => {
    const makeAppointmentTestData = TestData.makeAppointmentTestData();
    for (const apptData of makeAppointmentTestData) {
        console.log(`Test ID: ${apptData.testId} - Facility: ${apptData.facility} - HCP: ${apptData.hcp} - Visit Date: ${apptData.visitDt}`)
    }
})