const crypto = require('crypto');
const fs = require('fs').promises;

module.exports = (program) => {
  program
    .command('hash <input>')
    .description('Generate SHA-256 hash of a file')
    .action(async (input) => {
      const data = await fs.readFile(input);
      const hash = crypto.createHash('sha256').update(data).digest('hex');
      console.log(`SHA-256: ${hash}`);
    });
};