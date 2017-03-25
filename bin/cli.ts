import * as yargs from 'yargs';

import {BusinessSession} from '../lib/businessSession';

const argv = yargs
    .usage('Usage: $0 <command> [options]')
    .command('list-accounts', 'List accounts')
    .demandCommand(1, 'No command was specified! Please specify command')
    .option('userId', {
        alias: 'u',
        describe: 'User ID',
        type: 'string',
    })
    .option('pinCode', {
        alias: 'p',
        describe: 'Password from PIN calculator',
        type: 'string',
    })
    .demandOption('userId', 'Please provide user ID')
    .demandOption(['pinCode'], 'Please provide one of user password forms')
    .help('h')
    .alias('h', 'help')
    .epilog('https://github.com/brainbeanapps/swedbank-ee-client')
    .argv;

let action: Promise<void>;
const session = new BusinessSession();
if (argv.pinCode) {
    action = session.signinUsingPinCode(argv.userId, argv.pinCode);
}
if (argv.command === 'list-accounts') {
    //TODO:
    action = action;
}
action = action.then(() => session.logout());
action.then(() => {
    process.exit(0);
}).catch((error) => {
    console.error(error);
    process.exit(1);
});
