const fs = require('fs');
const path = require('path');
const absPath= process.argv[2];

const getFiles = (absPath) => {
    let arrayFiles = [];
    let route = fs.lstatSync(absPath);

    if(route.isFile()&& path.extname(absPath) === '.md') {
        arrayFiles.push(absPath);
        // console.log('Es un archivo');
    } else if(route.isDirectory()) {
        let arrayElements = fs.readdirSync(absPath);
        arrayElements.forEach((element) => {
            const newPath = path.join(absPath, element);
            arrayFiles = arrayFiles.concat(getFiles(newPath));
        });
    } else {
        //Probar .filter en el retorno
    }
    return arrayFiles;
};

console.log(getFiles(absPath));

module.exports = {
    getFiles
}
