const fs = require('fs');

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if(err) console.log(err);
        console.log("README.md generated!");
    });

}

module.exports = writeToFile;