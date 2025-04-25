#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const fileEncryptor = require('../tools/fileEncryptor');
const fileHasher = require('../tools/fileHasher');

// Display banner and features
console.log(chalk.cyan(figlet.textSync('MToolkit', { horizontalLayout: 'full' })));
console.log(chalk.yellow('Welcome to MToolkit - A collection of powerful CLI mini-tools!\n'));
console.log(chalk.green('Available Tools:'));
console.log(chalk.white('  encrypt <input> <output>  - Encrypt a file with a password'));
console.log(chalk.white('  decrypt <input> <output>  - Decrypt a file with a password'));
console.log(chalk.gray('\nRun `mtoolkit --help` for more details.\n'));
console.log(chalk.white('  hash <input>             - Generate SHA-256 hash of a file'));

program
  .version('1.0.0')
  .name('mtoolkit')
  .description('MToolkit: A collection of useful CLI mini-tools');

// Register file encryptor commands
fileEncryptor(program);
fileHasher(program);

program.parse(process.argv);

// Show help if no command is provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}