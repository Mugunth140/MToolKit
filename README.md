MToolkit
MToolkit is a cross-platform CLI tool that provides a collection of utility mini-tools for developers and power users. It features a sleek interface and is designed to be extensible, allowing new tools to be added easily.
Features

File Encryption/Decryption: Securely encrypt and decrypt files using AES-256-GCM with a password.
Cross-Platform: Works on Windows, macOS, and Linux.
Extensible: Easily add new mini-tools as subcommands.

Installation
Install MToolkit globally via npm:
npm install -g mtoolkit

Usage
Run the CLI:
mtoolkit

This displays a colorful banner and lists available tools. Use --help for detailed command information:
mtoolkit --help

Available Commands

Encrypt a File:
mtoolkit encrypt <input> <output>

Encrypts the input file and saves it to the output file. Prompts for a password.

Decrypt a File:
mtoolkit decrypt <input> <output>

Decrypts the input file and saves it to the output file. Requires the same password used for encryption.


Examples
Encrypt a file:
mtoolkit encrypt document.txt document.enc

Decrypt a file:
mtoolkit decrypt document.enc document_decrypted.txt

Security Notes

Encryption: Uses AES-256-GCM with a PBKDF2-derived key, random salt, and IV for secure file encryption.
Password: Ensure you remember the password, as it cannot be recovered.
Storage: The encrypted file includes salt, IV, and authentication tag.

Adding New Tools
To add a new tool:

Create a module in the tools/ directory (e.g., tools/newTool.js).
Export a function that registers commands with commander:module.exports = (program) => {
  program
    .command('newtool <arg>')
    .description('Description of new tool')
    .action((arg) => {
      console.log('New tool action:', arg);
    });
};


Import and register it in bin/mtoolkit.js:const newTool = require('../tools/newTool');
newTool(program);



Development
Clone the repository and install dependencies:
git clone https://github.com/yourusername/mtoolkit.git
cd mtoolkit
npm install

Link locally for testing:
npm link

Contributing
Contributions are welcome! Please open an issue or submit a pull request on GitHub.
License
MIT License. See LICENSE for details.
Contact
For issues, visit the GitHub Issues page.
