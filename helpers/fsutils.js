const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Function to write a new file when given a file path and content to include
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// Function to read a file from the provided filepath and add new data to the content
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);

      // The writefile method rewrites the entire file which includes the previous and new data combined
      writeToFile(file, parsedData);
    }
  });
};


module.exports = { readFromFile, writeToFile, readAndAppend };