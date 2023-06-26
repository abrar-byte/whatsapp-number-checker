const chalk = require("chalk");
const log = console.log;
const checkNumber = require("./utils/checkNumber");
const checkNumberBulk = require("./utils/checkNumberBulk");
const Numbers = require("./data/Numbers");
const fs = require("fs");
const { create, Whatsapp } = require('@open-wa/wa-automate');

(async () => {
  if (Numbers.length < 1 && process.argv.length < 3) {
    log(chalk.red.bold("No Phone Number has been passed"));
    log(chalk.blue("Example: npm run check 919898989898"));
    process.exit(0);
  }

  const phoneNumber = process.argv[2];
  const existNumbers = [];

  const client = await create();
//   await client.initialize();

  if (!client.isConnected()) {
    log(chalk.red.bold("WhatsApp is not logged in. Please log in."));
    process.exit(0);
  }

  if (phoneNumber) {
    log(chalk.blue(`Checking for Existence : ${phoneNumber}`));
    const numberExists = await checkNumber(phoneNumber);
    if (numberExists) log(chalk.green.bold("Number Exists on Whatsapp"));
    else log(chalk.red.bold("Number doesn't exist on Whatsapp"));
  } else {
    for (const iterator of Numbers) {
      const numberIsExist = await checkNumber(iterator);
      if (numberIsExist) {
        log(chalk.green.bold(`Number ${iterator} is Exist`));
        existNumbers.push(iterator);
      } else {
        log(chalk.red.bold(`Number ${iterator} doesn't exist`));
      }
    }
  }

  fs.writeFile("data.txt", existNumbers.join(",\n"), (err) => {
    if (err) {
      log(chalk.red.bold("Failed to export data to data.txt"));
    } else {
      log(chalk.green.bold("Data exported to data.txt successfully"));
    }
  });
})();
