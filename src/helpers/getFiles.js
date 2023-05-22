const fs = require('fs');
// const path = require('path');
// const process = require('process');
const { marked } = require('marked');
// const absPath = process.argv[2];
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const arrayPrueba = [
    'C:/Users/famil/DEV005-md-links/src/prueba/prueba.md',
    'C:/Users/famil/DEV005-md-links/src/prueba/pruebita/pruebita.md',
    'C:/Users/famil/DEV005-md-links/src/prueba/pruebita/lapruebadelapruebita/lapruebadelapruebita.md'
];

// const getFiles = (absPath) => {
//     let arrayFiles = [];
//     let route = fs.lstatSync(absPath);

//     if(route.isFile()) {
//         arrayFiles.push(absPath);
//         // console.log('Es un archivo');
//     } else if(route.isDirectory()) {
//         let arrayElements = fs.readdirSync(absPath);
//         arrayElements.forEach((element) => {
//             const newPath = path.join(absPath, element);
//             arrayFiles = arrayFiles.concat(getFiles(newPath));
//         });
//     } else {
//         console.log('Inválido');
//     }
//      //Probar .filter en el retorno
//     return arrayFiles = arrayFiles.filter(file => path.extname(file) === '.md');  
// };

// console.log(getFiles(absPath));

const readFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (error, data) => {
            if(error) {
            reject(error);
            } else {
            resolve(data);
            }
        });
    });
};

const getLinks = (data, filePath) => {
    const htmlContent = marked(data,{
        headerIds: false,
        mangle: false,
    });

    const dom = new JSDOM(htmlContent);
    let arrayLinks = [];
    const links = dom.window.document.querySelectorAll('a');  // Salida: Links
    links.forEach((link) => {
        arrayLinks.push({
            href: link.href,
            text: link.textContent.substring(0,50),
            file: filePath,
        });
        return arrayLinks;

    });
   
    console.log(arrayLinks);
  
    return htmlContent;
};

arrayPrueba.forEach((filePath) => {
 readFile(filePath)
    .then((data) => {
      return getLinks(data, filePath);
    })
    .catch((error) => {
      console.error(error);
    });
});

// module.exports = {
//     getFiles
// }
