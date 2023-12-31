// const puppeteer = require("puppeteer");
// const existingNumbers = [];
// let browser; // Declare the browser variable outside the function
// let page; // Declare the page variable outside the function

// async function checkNumber(phoneNumber, wide, index) {
//   if (!browser) { // Check if the browser is already open
//     browser = await puppeteer.launch({
//       headless: false,
//       userDataDir: "./profileData",
//     });
//     page = await browser.newPage();
//     await page.setUserAgent(
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
//     ); // To Make sure Mobile version of Whatsapp Web doesn't load, fixes headless issue
//   }

//   const url = `https://web.whatsapp.com/send?phone=${phoneNumber["Phone Valid"]}&text&app_absent=0`;

//   if (wide === index + 1) {
//     await page.goto(url, { waitUntil: "networkidle0" });
//     await page.waitForNavigation({ waitUntil: "networkidle2" });
//     await new Promise((r) => setTimeout(r, 10000)); // Wait for page load - added for cases where networkidle doesn't
//     let numberExists = false;
//     if ((await page.$("#main")) !== null) numberExists = true;
//     existingNumbers.push(phoneNumber);
//     await browser.close();
//     return numberExists;
//   } else {
//     await page.goto(url, { waitUntil: "networkidle0" });
//     await page.waitForNavigation({ waitUntil: "networkidle2" });
//     await new Promise((r) => setTimeout(r, 10000)); // Wait for page load - added for cases where networkidle doesn't
//     let numberExists = false;
//     if ((await page.$("#main")) !== null) numberExists = true;
//     existingNumbers.push(phoneNumber);
//     return numberExists;
//   }
// }

// module.exports = checkNumber;

// Second 

const puppeteer = require("puppeteer");
const existingNumbers = [];

let browser; 
let page; 

async function checkNumber(phoneNumber, wide, index) {
  if (!browser) { // Periksa apakah browser sudah dibuka
    browser = await puppeteer.launch({
      headless: false,
      userDataDir: "./profileData",
    });
    page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
    );
  }

  const url = `https://web.whatsapp.com/send?phone=${phoneNumber["Phone Valid"]}`;

  // await page.goto(url, { waitUntil: "networkidle0" });
  await page.goto(url, { waitUntil: "load" });

  await page.waitForNavigation({ waitUntil: "networkidle2" });
  const randomDelay = Math.random() * 10000 + 20000; 
  await new Promise((r) => setTimeout(r, randomDelay)); 
  let numberExists = false;
  if (await page.$("#main")) {
    numberExists = true;
  }
  existingNumbers.push(phoneNumber);

  if (wide === index + 1) {
    await browser.close();
  } 

  return numberExists;
}



module.exports = checkNumber;




