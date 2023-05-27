const { existPath, absolutePath } = require('./path.js');
const { getFiles, readAllMds, validate, stats } = require('../src/helpers/getFiles.js');

const mdLinks = (userPath, options) => {
  const route = absolutePath(userPath);
  return new Promise((resolve, reject) => {
    if (!existPath(userPath)) {
      reject(new Error('Error, la ruta no existe'));
    } else if (options.validate === true && (options.stats === false)) { 
      const arrayFiles = getFiles(route);
      readAllMds(arrayFiles)
      .then((link) => {
        resolve(validate(link.flat()));
      });
    } else if (options.validate === false && (options.stats === true)){
      const arrayFiles = getFiles(route);
      readAllMds(arrayFiles)
      .then((link) => {
        validate(link.flat()).then((links) => {
          resolve(stats(links));
        });    
      });
    } else { 
      const arrayFiles = getFiles(route);
      readAllMds(arrayFiles)
      .then((res) => {
        resolve(res.flat());
      });
      }        
  });
};

module.exports = {
  mdLinks
};