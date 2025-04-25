const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

// Utility to prompt for password
async function promptPassword() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('Enter password: ', (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Generate a key from password and salt using PBKDF2
function generateKey(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
}

// Encrypt a file
async function encryptFile(inputFile, outputFile, password) {
  try {
    // Generate salt
    const salt = crypto.randomBytes(16);
    
    // Generate key
    const key = generateKey(password, salt);
    
    // Generate IV (Initialization Vector)
    const iv = crypto.randomBytes(12); // 12 bytes for GCM
    
    // Create cipher
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    
    // Read input file
    const inputData = await fs.readFile(inputFile);
    
    // Encrypt data
    const encrypted = Buffer.concat([cipher.update(inputData), cipher.final()]);
    const authTag = cipher.getAuthTag();
    
    // Combine salt, iv, authTag, and encrypted data
    const outputData = Buffer.concat([salt, iv, authTag, encrypted]);
    
    // Write to output file
    await fs.writeFile(outputFile, outputData);
    
    console.log(`File encrypted successfully: ${outputFile}`);
  } catch (error) {
    console.error(`Encryption failed: ${error.message}`);
    process.exit(1);
  }
}

// Decrypt a file
async function decryptFile(inputFile, outputFile, password) {
  try {
    // Read encrypted file
    const data = await fs.readFile(inputFile);
    
    // Extract salt (16 bytes), iv (12 bytes), authTag (16 bytes), and encrypted data
    const salt = data.slice(0, 16);
    const iv = data.slice(16, 28);
    const authTag = data.slice(28, 44);
    const encryptedData = data.slice(44);
    
    // Generate key
    const key = generateKey(password, salt);
    
    // Create decipher
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    
    // Decrypt data
    const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
    
    // Write to output file
    await fs.writeFile(outputFile, decrypted);
    
    console.log(`File decrypted successfully: ${outputFile}`);
  } catch (error) {
    console.error(`Decryption failed: ${error.message}`);
    process.exit(1);
  }
}

// Register commands with the program
module.exports = (program) => {
  program
    .command('encrypt <input> <output>')
    .description('Encrypt a file with a password')
    .action(async (input, output) => {
      const password = await promptPassword();
      await encryptFile(input, output, password);
    });

  program
    .command('decrypt <input> <output>')
    .description('Decrypt a file with a password')
    .action(async (input, output) => {
      const password = await promptPassword();
      await decryptFile(input, output, password);
    });
};