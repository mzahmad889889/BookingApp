const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// Configuration
const dbName = "mongodb://127.0.0.1:27017/kpit";
const backupDir = path.join(__dirname, "backups");


// Ensure backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// Function to perform the backup
const backupDatabase = () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFilePath = path.join(backupDir, `${dbName}-${timestamp}.gz`);

  const dumpCommand = `mongodump --db=${dbName} --archive=${backupFilePath} --gzip`;

  exec(dumpCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during backup: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Backup process stderr: ${stderr}`);
      return;
    }
    console.log(`Backup successful: ${backupFilePath}`);
  });
};

module.exports = backupDatabase;


