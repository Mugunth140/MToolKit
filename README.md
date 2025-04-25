MToolkit

MToolkit is a cross-platform command-line interface (CLI) tool that provides a collection of powerful and easy-to-use utilities for developers and power users. With a sleek interface and extensible design, MToolkit makes tasks like file encryption and hashing simple and secure.
Features

File Encryption/Decryption: Securely encrypt and decrypt files using AES-256-GCM with password-based key derivation.
File Hashing: Generate SHA-256 hashes for file integrity verification.
Cross-Platform: Runs seamlessly on Windows, macOS, and Linux.
Extensible: Easily add new mini-tools to expand functionality.
User-Friendly: Colorful ASCII banner and clear command structure.

Installation
Install MToolkit globally via npm:
npm install -g @mugunth140/mtoolkit

Ensure you have Node.js (v14 or later) installed.
Usage
Run the MToolkit CLI:
mtoolkit

This displays a colorful banner and lists available tools. Use --help for detailed command information:
mtoolkit --help

Available Commands



Command
Description



encrypt <input> <output>
Encrypt a file with a password


decrypt <input> <output>
Decrypt a file with the same password


hash <input>
Generate a SHA-256 hash of a file


Examples
Encrypt a File
mtoolkit encrypt document.txt document.enc


Prompts for a password and encrypts document.txt to document.enc.

Decrypt a File
mtoolkit decrypt document.enc document_decrypted.txt


Prompts for the password and decrypts document.enc to document_decrypted.txt.

Hash a File
mtoolkit hash document.txt


Outputs the SHA-256 hash of document.txt.

Security

Encryption: Uses AES-256-GCM with PBKDF2-derived keys, random salts, and IVs for robust security.
Hashing: Employs SHA-256 for reliable file integrity checks.
Password Safety: Ensure you remember your encryption password, as it cannot be recovered.

Adding New Tools
MToolkit is designed to be extensible. To add a new tool:

Create a module in the tools/ directory (e.g., tools/newTool.js):module.exports = (program) => {
  program
    .command('newtool <arg>')
    .description('Description of new tool')
    .action((arg) => {
      console.log('New tool action:', arg);
    });
};


Register it in bin/mtoolkit.js:const newTool = require('../tools/newTool');
newTool(program);


Update the banner in bin/mtoolkit.js to list the new tool.

Development
To contribute or modify MToolkit:

Clone the repository:
git clone https://github.com/mugunth140/mtoolkit.git
cd mtoolkit


Install dependencies:
npm install


Test locally:
node bin/mtoolkit.js


Link for global testing:
npm link
mtoolkit



Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/new-tool).
Commit your changes (git commit -m 'Add new tool').
Push to the branch (git push origin feature/new-tool).
Open a pull request.

Please include tests and update documentation as needed.
Issues
Report bugs or suggest features on the GitHub Issues page.
License
MToolkit is licensed under the MIT License.
Contact

Author: Mugunth
GitHub: mugunth140/mtoolkit
npm: @mugunth140/mtoolkit


Built with ❤️ for developers and power users.
