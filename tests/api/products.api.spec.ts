import {test, expect} from '@playwright/test';
import {log} from "../helpers/logger";
import constants from "../../data/constants.json"
import TestData from "../../data/test-data";

test.describe("REST API Demo", () => {
    let envConfig = undefined;

    test.beforeEach("Get the env config", async ({request}, testInfo) => {
        envConfig = testInfo.project.use as any;

        console.log("URL:", `${envConfig.apiURL}${constants.REQ_REST_ENDPOINT.GET_LIST_PRODUCTS}`)
    })

    test("Get all products", async ({request}) => {
        await log("info", "Making a GET call using API endpoint: " + `${envConfig.apiURL}${constants.REQ_REST_ENDPOINT.GET_LIST_PRODUCTS}`);

        const response = await request.get(
            `${envConfig.apiURL}${constants.REQ_REST_ENDPOINT.GET_LIST_PRODUCTS}`
        );

        expect(response.status()).toBe(200);

        const data = await response.json();
        console.log("Payload response: " + JSON.stringify(data));

        expect(data).toHaveProperty("products");
        expect(data.products.length).toBeGreaterThan(0);

        await log("info", "Test passed: Get all products");
    });

    test("Search product", async ({ request }) => {
        await log("info", `Making a POST call using API endpoint: ${envConfig.apiURL}${constants.REQ_REST_ENDPOINT.POST_SEARCH_PRODUCT}`);

        const payLoad = TestData.productListPayload()[0];

        const response = await request.post(
            `${envConfig.apiURL}${constants.REQ_REST_ENDPOINT.POST_SEARCH_PRODUCT}`,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                data: payLoad
            }
        );
        expect(response.status()).toBe(200);

        const data = await response.json();
        console.log("Payload response: " + JSON.stringify(data));

        expect(data.products.length).toBeGreaterThan(0);
        expect(data.products[0].name).toContain("Blue Top");
    });
});
