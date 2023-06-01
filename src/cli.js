#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const { stats } = require('./getFiles.js');
const colors = require('colors');
const process = require('process');
const userPath = process.argv[2];
let optionsObj = {
  validate: false,
  stats: false,
};
const options = process.argv;


if( options.includes('--validate') && (!options.includes('--stats'))){
    optionsObj.validate = true;
} else if (!options.includes('--validate') && (options.includes('--stats'))) {
    optionsObj.stats = true;
} else if (options.includes('--validate') && (options.includes('--stats'))) {
    optionsObj.validate = true;
    optionsObj.stats = true;
} else {
    optionsObj.validate = false;
    optionsObj.stats = false;
}

mdLinks(userPath, optionsObj)
  .then((res) => {
    if(optionsObj.stats){
      const statsLink = stats(res);
      const totalColor = colors.blue(`Total: ${statsLink.Total}`);
      const uniqueColor = colors.green(`Unique: ${statsLink.Unique}`);
      const brokenColor = colors.red(`Broken: ${statsLink.Broken}`);
      console.log(`${totalColor.black} | ${uniqueColor.black} ${statsLink.Broken ? ` | ${brokenColor.black}`  : ''} `);
      // console.log(`Total: ${colors.blue(statsLink.Total)} Unique: ${colors.green(statsLink.Unique)}${statsLink.Broken ? ` Broken: ${colors.red(statsLink.Broken)}` : ''}`);
    } else if (optionsObj.validate && !optionsObj.stats){
      res.forEach((element) => {
        console.log(`URL: ${element.href}`.blue);
        console.log(`Text: ${element.text}`.magenta);
        console.log(`File: ${element.file}`.green);
        console.log(`Status: ${element.status}`.yellow);
        console.log(`Status Text: ${element.statusText}`.red);
        console.log('');
      })
      // console.log('Result:', res);
    } else {
      res.forEach((element) => {
        console.log(`URL: ${element.href}`.blue);
        console.log(`Text: ${element.text}`.magenta);
        console.log(`File: ${element.file}`.green);
        console.log('');
      })
    }
  })
  .catch((error) => {
    // console.log(`Error: ${error}`);
    return error;
  });
  
