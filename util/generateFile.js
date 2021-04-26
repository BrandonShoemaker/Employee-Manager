const fs = require('fs');

// writes to specified file with given data, creates if not already existing
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if(err) console.log(err);
        console.log("index.html generated!");
    });

}

module.exports = writeToFile;