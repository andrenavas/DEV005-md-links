const { existPath, absolutePath } = require('./path.js')
// const { getFiles } = require('../src/helpers/getFiles.js')
const userPath = process.argv[2];


// Función MD-Links
const mdLinks = (userPath) => {
  return new Promise((resolve, reject) => {
    if (existPath(userPath)) {
      const resolvedPath = absolutePath(userPath);
      resolve(resolvedPath);
    } else { 
      reject('Error, la ruta no existe')
    }
  });
};

// getFiles(userPath);

mdLinks(userPath)
  .then((resolvePath) => {
    console.log(`La ruta es válida: ${resolvePath}`);
  })
  .catch((error) => {
    console.log(error);
    // console.log(`Error: ${error}`);
  });
  
module.exports = {
  mdLinks
}