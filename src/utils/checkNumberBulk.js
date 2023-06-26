// const puppeteer = require("puppeteer");

// async function checkNumberBulk(phoneNumbers) {
// 	const browser = await puppeteer.launch({
// 		headless: false,
// 		userDataDir: "./profileData",
// 	});
// 	const results = [];
// 	for (const phoneNumber of phoneNumbers) {
// 		// const phoneNumber = phoneNumbers[i];
// 		const page = await browser.newPage();
// 		await page.setUserAgent(
// 			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
// 		); // To Make sure Mobile version of Whatsapp Web doesn't load, fixes headless issue
// 		// await page.setDefaultNavigationTimeout(0);
// 		await page.goto(
// 			`https://web.whatsapp.com/send?phone=${phoneNumber}&text&app_absent=0`,
// 			{ waitUntil: "networkidle0" }
// 		);
// 		await page.waitForNavigation({
// 			waitUntil: "networkidle2",
// 		});
// 		await new Promise(r => setTimeout(r, 10000)); // Wait for page load - added for cases where networkidle doesn't
// 		let numberExists = false;
// 		if ((await page.$("#main")) !== null) numberExists = true;
// 		results.push({
// 			phoneNumber,
// 			exists: numberExists,
// 		});
// 		await page.close();
// 	}

// 	await browser.close();

// 	return results;
// }

// module.exports = checkNumberBulk;


const puppeteer = require("puppeteer");

async function checkNumberBulk(phoneNumbers) {
	const browser = await puppeteer.launch({
		headless: false,
		userDataDir: "./profileData",
	});

	const results = [];
	for (let i = 0; i < phoneNumbers.length; i++) {
		const iterator = phoneNumbers[i];
		const page = await browser.newPage();
		// const phoneNumber = phoneNumbers[i];
		await page.setUserAgent(
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
		); // To Make sure Mobile version of Whatsapp Web doesn't load, fixes headless issue
		// await page.setDefaultNavigationTimeout(0);
		await page.goto(
			`https://web.whatsapp.com/send?phone=${iterator["Contact Number"]}&text&app_absent=0`,
			{ waitUntil: "networkidle0" }
		);
		await page.waitForNavigation({
			waitUntil: "networkidle2",
		});
		await new Promise(r => setTimeout(r, 10000)); // Wait for page load - added for cases where networkidle doesn't
		let numberExists = false;
		if ((await page.$("#main")) !== null) numberExists = true;
		results.push({
			phoneNumber,
			exists: numberExists,
		});
		await page.close();
	}

	await browser.close();

	return results;
}

module.exports = checkNumberBulk;

