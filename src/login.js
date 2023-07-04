const chalk = require("chalk");
const log = console.log;
const puppeteer = require("puppeteer");
// (async () => {
// 	log(
// 		chalk.blue("Opening a browser window, please scan / login on Whatsapp")
// 	);
// 	log(chalk.yellow("Once you're logged in, you can close the page or tab"));
// 	const browser = await puppeteer.launch({
// 		headless: false,
// 		userDataDir: "./profileData",
// 	});
// 	const page = await browser.newPage();
// 	await page.goto("https://web.whatsapp.com");
// 	browser.on("targetdestroyed", async () => {
// 		log(chalk.yellow("Page Closed. If logged in you can use the check command"));
// 		browser.close();
// 	});
// })();
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  // ...
  log(chalk.yellow("Once you're logged in, you can close the page or tab"));
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "./profileData",
  });
  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com");
  
  rl.question('Press Enter after scanning the QR code...', () => {
    log(chalk.yellow("QR code scanned. You can now close the page or tab."));
    browser.close();
    rl.close();
  });
})();

