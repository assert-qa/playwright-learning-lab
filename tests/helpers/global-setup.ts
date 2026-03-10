import {type FullConfig} from "@playwright/test";
import * as path from "node:path";
import * as fs from "node:fs";

export default async function globalSetup(config: FullConfig) {
    console.log("[INFO]: Running global setup...");
    if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
        console.log("[INFO]: Detecting local run..");

        // Delete allure results (don't need to delete manually for test result)
        const resultsDir = path.resolve(process.cwd(), "allure-results")
        console.log(resultsDir);

        if (fs.existsSync(resultsDir)){
            fs.rmSync(resultsDir, {recursive: true, force: true});
            console.log("[INFO]: Allure results deleted for local run");
        }
    }
    process.env.LOGIN_COOKIES = undefined
}