const { mdLinks } = require('./index.js');
const process = require('process');
const userPath = process.argv[2];
let optionsObj = {
  validate: false,
  stats: false,
};
const options = process.argv;


//stats con validate
// retorna ({total, broken y unique})
// solo stats
// retorna ({total, uniques})

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
    console.log('Este es el array de OBJS:', res);
  })
  .catch((error) => {
    // console.log(`Error: ${error}`);
    return error;
  });


  
