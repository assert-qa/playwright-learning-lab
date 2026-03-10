import {test} from "@playwright/test";
import chalk from "chalk";

type Level = "log" | "info" | "warn" | "error";

export async function log(level: Level, message: string) {
    const plainLine = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`; // for allure report and terminal
    let coloredLine = plainLine;

    switch (level){
        case "info":
            coloredLine = chalk.blue(plainLine)
            break;
        case "warn":
            coloredLine = chalk.yellow(plainLine)
            break;
        case "error":
            coloredLine = chalk.red(plainLine)
            break;
        default:
            coloredLine = chalk.white(plainLine)
    }

    // print colored text in terminal
    (console[level] || console.log)(coloredLine);

    // send plain text to Allure report
    await test.step(plainLine, async () => {});
}