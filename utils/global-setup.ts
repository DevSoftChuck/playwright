import { rimraf } from "rimraf";

async function globalSetup() {
   rimraf(`./allure-results`);
   rimraf(`./html-report`);
   rimraf(`./playwright-report`);
   rimraf(`./test-results`);
}

export default globalSetup;