const fs = require('fs');

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if(err) console.log(err);
        console.log("index.html generated!");
    });

}

module.exports = writeToFile;