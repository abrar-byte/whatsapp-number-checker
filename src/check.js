const chalk = require("chalk");
const log = console.log;
const checkNumber = require("./utils/checkNumber");
const checkNumberBulk = require("./utils/checkNumberBulk");
const Numbers = [];
// const Numbers = [6283829949707,6283829943333,6289669235897];

(async () => {
	console.log("cek", process.argv);
	if (!Numbers && process.argv.length < 3) {
		log(chalk.red.bold("No Phone Number has been passed"));
		log(chalk.blue("Example: npm run check 919898989898"));
		process.exit(0);
	}
	// if (Numbers) {
	// 	log(chalk.blue.bold("Checking..."));
	// 	for (let i = 0; i <= Numbers.length; i++) {
	// 		var phoneNumber = Numbers[i];
	// 		const numberExists = await checkNumberBulk(phoneNumber);
	// 		if (numberExists) {
	// 			log(chalk.green.bold(`Number Exists on Whatsapp`));
	// 			// logger.write("wa.me/" + phoneNumber)
	// 			console.log("wa.me/" + phoneNumber);
	// 		} else {
	// 			console.log("false " + phoneNumber);
	// 		}
	// 	}
	// 	process.exit(0);

	// }

	if (Numbers.length > 0) {
		for (const iterator of Numbers) {
			const numberIsExist = await checkNumber(iterator)
			if (numberIsExist) {
				log(chalk.green.bold(`Number ${iterator} is Exist`))
			} else {
				log(chalk.red.bold(`Number ${iterator} doesn't exist`))
			}
		}
	} else {

		
		const phoneNumber = process.argv[2];
		
		if (phoneNumber) {
			log(chalk.blue(`Checking for Existence : ${phoneNumber}`));
			const numberExists = await checkNumber(phoneNumber);
			if (numberExists) log(chalk.green.bold("Number Exists on Whatsapp"));
			else log(chalk.red.bold("Number doesn't exist on Whatsapp"));
		} else {
			log(chalk.red.bold("No Phone Number has been passed"));
			log(chalk.blue("Example: npm run check 919898989898"));
		}

		process.exit(0);
	}
})();
