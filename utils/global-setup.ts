import { rimraf } from "rimraf";

async function globalSetup() {
   rimraf(`./allure-results`);
   rimraf(`./playwright-report`);
   rimraf(`./test-results`);
}

export default globalSetup;