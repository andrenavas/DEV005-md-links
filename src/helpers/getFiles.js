const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fetch = require('node-fetch');

const getFiles = (dirPath) => {
  let arrayFiles = [];
  const route = fs.lstatSync(dirPath);

  if (route.isFile()) {
    arrayFiles.push(dirPath);
  } else if (route.isDirectory()) {
    const arraylinks = fs.readdirSync(dirPath);
    arraylinks.forEach((link) => {
      const newPath = path.join(dirPath, link);
      arrayFiles = arrayFiles.concat(getFiles(newPath));
    });
  } else {
    console.log('Inválido');
  }

  return arrayFiles.filter((file) => path.extname(file) === '.md');
};


const mdToHtml = (data) => {
  const htmlContent = marked(data, {
    headerIds: false,
    mangle: false,
  });

  const dom = new JSDOM(htmlContent);
  const links = dom.window.document.querySelectorAll('a');  // Salida: Links
  // console.log(links);
  return links;
};

const getLinks = (links, filePath) => {

  const arrayLinks = [];
  links.forEach((link) => {
    const linkObj = {
      href: link.href,
      text: link.textContent.substring(0, 50),
      file: filePath,
    };
    arrayLinks.push(linkObj);
  });
  return arrayLinks;
};


const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        const convertHtml = mdToHtml(data);
        const linksFromHtml = getLinks(convertHtml, filePath);        
        resolve(linksFromHtml);
      }
    });
  });
};

const readAllMds = (arrayFiles) => {
  const arrayLinks = arrayFiles.map((file) => {
    return readFile(file);
  });
  return Promise.all(arrayLinks);
};

const validate = (arrayLinks) => {
  return new Promise((resolve) => {
    let fetchLinks = arrayLinks.map((link) => {
      return fetch(link.href)
        .then((res) => {
          link.status = res.status;
          link.statusText = res.statusText;
        })
        .catch((err) => {
          link.status = err;
        });
    });
    Promise.all(fetchLinks).then(() => {
      resolve(arrayLinks);

    });
  });
};
/**
   * @params {arrayObjs}
   * @return { objeto de total, unique, brokens}
   */

const stats = (arrayLinks) => {
  let uniqueSet = new Set(arrayLinks.map((link) => link.href)).size;
  return {
    Total: arrayLinks.length,
    Uniques: uniqueSet,
    Broken: (arrayLinks.filter(element => element.statusText === 'Not Found')).length,
  };
};

module.exports = {
  getFiles, readAllMds, validate, stats
};
