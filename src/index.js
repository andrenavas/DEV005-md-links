const { existPath } = require('./path.js');
const { getFiles, readAllMds } = require('../src/helpers/getFiles.js');
const process = require('process');
const userPath = process.argv[2];


// Función MD-Links
const mdLinks = (userPath) => {
  return new Promise((resolve, reject) => {
    if (!existPath(userPath)) {
      reject(new Error('Error, la ruta no existe'));
    } else { 
      const arrayFiles = getFiles(userPath);
      readAllMds(arrayFiles)
      .then((res) => {
        resolve(res.flat());
      });
    }
  });
};

mdLinks(userPath)
  .then((res) => {
    console.log('Este es el array de OBJS:', res);
  })
  .catch((error) => {
    console.log(error);
    // console.log(`Error: ${error}`);
  });
  
module.exports = {
  mdLinks
};