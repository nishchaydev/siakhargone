const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

console.log("Script started");

const contentPath = path.join(__dirname, '..', 'Annual Calendar 24-25.pdf');
console.log("Reading file from:", contentPath);

if (!fs.existsSync(contentPath)) {
    console.error("File not found!");
    process.exit(1);
}

const dataBuffer = fs.readFileSync(contentPath);
console.log("File read, parsing PDF...");

pdf(dataBuffer).then(function (data) {
    console.log("PDF Parsed Successfully. Text content below:");
    console.log("------------------------------------------");
    console.log(data.text);
    console.log("------------------------------------------");
}).catch(err => {
    console.error("Error parsing PDF:", err);
});
