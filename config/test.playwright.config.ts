import {defineConfig} from "@playwright/test";
import {baseConfig} from "../playwright.config";
import { EnvConfig } from "../tests/helpers/config-fixtures";
import path from "node:path";

console.log("RUNNING IN TEST ENVIRONMENT")
export default defineConfig<EnvConfig>({
    ...baseConfig, // loads all existing config values
    testDir: path.resolve(process.cwd(), "./tests"),
    use: {
        // Override or add new config values for the test environment
        ...baseConfig.use, // loads all existing use options
        envName: "test",
        appURL: "https://katalon-demo-cura.herokuapp.com/",
        nopCommerceWeb: "https://admin-demo.nopcommerce.com/login?returnUrl=%2Fadmin%2F",
        apiURL: "https://automationexercise.com/api",
        dbConfig: {
            server: "",
            host: "test-db-host",
            dbName: "",
            connectionStr: ""
        }
    }
})

