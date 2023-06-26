const puppeteer = require("puppeteer");

async function checkLoginAndNumbers(phoneNumbers) {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    //   userDataDir: "../.../profileData",
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
    );

    await page.goto("https://web.whatsapp.com", { waitUntil: "networkidle0" });
    await page.waitForTimeout(8000);
    const isLoginPage = await page.evaluate(() => {
        const loginButton = document.querySelector("._1Xkut");
        return loginButton !== null;
      });
console.log("data",isLoginPage)
    // if (isLoginPage) {
    //   console.log("Belum login. Arahkan ke halaman login WhatsApp Web.");
     
    // } else {
    //   console.log("Sudah login. Melakukan pengecekan nomor...");
    //   for (let i = 0; i < phoneNumbers.length; i++) {
    //     const phoneNumber = phoneNumbers[i];
    //     await page.goto(
    //       `https://web.whatsapp.com/send?phone=${phoneNumber}&text&app_absent=0`,
    //       { waitUntil: "networkidle0" }
    //     );
    //     await page.waitForNavigation({
    //       waitUntil: "networkidle2",
    //     });
    //     await page.waitForTimeout(10000);
    //     const numberExists = await page.$("#main") !== null;
    //     if (numberExists) {
    //       console.log(`Nomor ${phoneNumber} terdaftar dalam WhatsApp.`);
    //     } else {
    //       console.log(`Nomor ${phoneNumber} tidak terdaftar dalam WhatsApp.`);
    //     }
    //   }
    // }

    // Tambahkan langkah-langkah untuk menutup tab jika diperlukan
    // await browser.close();
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

module.exports = checkLoginAndNumbers;
