const { existPath, absolutePath } = require('./path.js');
const { getFiles, readAllMds, validate} = require('../src/getFiles.js');

const mdLinks = (userPath, options) => {
  const route = absolutePath(userPath);
  return new Promise((resolve, reject) => {
    if (!existPath(userPath)) {
      reject(new Error('Error, path does not exist'));
    } else if (options.validate) { 
      const arrayFiles = getFiles(route);
      readAllMds(arrayFiles)
      .then((link) => {
        resolve(validate(link.flat()));
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