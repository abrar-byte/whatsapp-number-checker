// const chalk = require("chalk");
// const log = console.log;
// const checkNumber = require("./utils/checkNumber");
// const checkNumberBulk = require("./utils/checkNumberBulk");
// const Numbers = require("./data/Numbers");
// const fs = require("fs");
// console.log("cek length", Numbers.length);
// (async () => {
// 	if (Numbers.length < 1 && process.argv.length < 3) {
// 		log(chalk.red.bold("No Phone Number has been passed"));
// 		log(chalk.blue("Example: npm run check 919898989898"));
// 		process.exit(0);
// 	}

// 	const phoneNumber = process.argv[2];
// 	const existNumbers = [];

// 	if (phoneNumber) {
// 		log(chalk.blue(`Checking for Existence : ${phoneNumber}`));
// 		const numberExists = await checkNumber(phoneNumber);
// 		if (numberExists) log(chalk.green.bold("Number Exists on Whatsapp"));
// 		else log(chalk.red.bold("Number doesn't exist on Whatsapp"));
// 	} else {
// 		for (let i = 0; i < Numbers.length; i++) {
// 			const iterator = Numbers[i];
// 			const numberIsExist = await checkNumber(
// 				iterator,
// 				Numbers.length,
// 				i
// 			);
// 			if (numberIsExist) {
// 				log(
// 					chalk.green.bold(
// 						`Number ${iterator["Phone Valid"]} is Exist`
// 					)
// 				);
// 				existNumbers.push(iterator);
// 			} else {
// 				log(
// 					chalk.red.bold(
// 						`Number ${iterator["Phone Valid"]} doesn't exist`
// 					)
// 				);
// 			}
// 		}
// 	}

// 	const csvHeader = Object.keys(existNumbers[0]).join(",");

// 	// Membuat baris data untuk CSV
// 	const csvRows = existNumbers.map(obj => Object.values(obj).join(","));

// 	// Menggabungkan header dan baris data
// 	const csvContent = `${csvHeader}\n${csvRows.join("\n")}`;

// 	// Menulis data ke file CSV
// 	fs.writeFile("validnumber.csv", csvContent, err => {
// 		if (err) {
// 			console.error("Failed to export data to data.csv", err);
// 		} else {
// 			console.log("Data exported to data.csv successfully");
// 		}
// 	});
// })();

const chalk = require("chalk");
const log = console.log;
const checkNumber = require("./utils/checkNumber");
const checkNumberBulk = require("./utils/checkNumberBulk");
const Numbers = require("./data/Numbers");
const fs = require("fs");

console.log("cek length", Numbers.length);

(async () => {
  if (Numbers.length < 1 && process.argv.length < 3) {
    log(chalk.red.bold("No Phone Number has been passed"));
    log(chalk.blue("Example: npm run check 919898989898"));
    process.exit(0);
  }

  const phoneNumber = process.argv[2];
  const existNumbers = [];

  if (phoneNumber) {
    log(chalk.blue(`Checking for Existence : ${phoneNumber}`));
    const numberExists = await checkNumber(phoneNumber);
    if (numberExists) log(chalk.green.bold("Number Exists on Whatsapp"));
    else log(chalk.red.bold("Number doesn't exist on Whatsapp"));
  } else {
    for (let i = 0; i < Numbers.length; i++) {
      const iterator = Numbers[i];
      const numberIsExist = await checkNumber(iterator, Numbers.length, i);
      if (numberIsExist) {
        log(chalk.green.bold(`Number ${iterator["Phone Valid"]} is Exist and this is the order to ${i+1}`));
        existNumbers.push(iterator);
      } else {
        log(chalk.red.bold(`Number ${iterator["Phone Valid"]} doesn't exist and this is the order to ${i+1}`));
      }
      
      // Setelah setiap 10 data, convert ke CSV
      if ((i + 1) % 10 === 0 || (i + 1) === Numbers.length) {
        await convertToCSV(existNumbers);
       
      }
    }
  }
})();

async function convertToCSV(existNumbers) {
  const csvHeader = Object.keys(existNumbers[0]).join(",");

  // Membuat baris data untuk CSV
  const csvRows = existNumbers.map(obj => Object.values(obj).join(","));

  // Menggabungkan header dan baris data
  const csvContent = `${csvHeader}\n${csvRows.join("\n")}`;

  // Menulis data ke file CSV
  fs.writeFile("validnumber.csv", csvContent, err => {
    if (err) {
      console.error("Failed to export data to validnumber.csv", err);
    } else {
      console.log("Data exported to validnumber.csv successfully");
    }
  });
}
