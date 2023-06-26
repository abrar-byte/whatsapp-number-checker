const chalk = require("chalk");
const log = console.log;
const checkNumber = require("./utils/checkNumber");
const checkNumberBulk = require("./utils/checkNumberBulk");
const Numbers = require("./data/Numbers");
const fs = require("fs");

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
    // for (const iterator of Numbers) {
    //   const numberIsExist = await checkNumber(iterator);
    //   if (numberIsExist) {
    //     log(chalk.green.bold(`Number ${iterator} is Exist`));
    //     existNumbers.push(iterator);
    //   } else {
    //     log(chalk.red.bold(`Number ${iterator} doesn't exist`));
    //   }
    // }
    for (let i = 0; i < Numbers.length; i++) {
      const iterator = Numbers[i];
      const numberIsExist = await checkNumber(iterator,Numbers.length,i);
      if (numberIsExist) {
        log(chalk.green.bold(`Number ${iterator["Contact Number"]} is Exist`));
        existNumbers.push(iterator);
      } else {
        log(chalk.red.bold(`Number ${iterator["Contact Number"]} doesn't exist`));
      }
    }
    
  }


  // fs.writeFile("data.txt", existNumbers.join("\n"), (err) => {
  //   if (err) {
  //     log(chalk.red.bold("Failed to export data to data.txt"));
  //   } else {
  //     log(chalk.green.bold("Data exported to data.txt successfully"));
  //   }
  // });
  const csvHeader = Object.keys(existNumbers[0]).join(',');

// Membuat baris data untuk CSV
const csvRows = existNumbers.map(obj => Object.values(obj).join(','));

// Menggabungkan header dan baris data
const csvContent = `${csvHeader}\n${csvRows.join('\n')}`;

// Menulis data ke file CSV
fs.writeFile('validnumber.csv', csvContent, (err) => {
  if (err) {
    console.error('Failed to export data to data.csv', err);
  } else {
    console.log('Data exported to data.csv successfully');
  }});
})();
