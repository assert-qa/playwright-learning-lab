import {FullConfig} from "@playwright/test";
import {exec} from "node:child_process";

export default async function globalTeardown(config: FullConfig) {
    console.log("[INFO]: Starting the global teardown process...");
    if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
        console.log("[INFO]: Local run detected - starting Allure server...");
        exec("allure serve", (error, stdout, stderr) => {
            if (error) {
                console.error("[ERROR]: Starting Allure server: ", error.message);
            }
        })
    }
    console.log("[INFO]: Completed the global teardown process...")
}