// Funciones que interactuan con la ruta

const pathModules = require('path');
const fs = require('fs');

// Validar si la ruta existe

const existPath = (userPath) => {
    if (fs.existsSync(userPath)){
        console.log('La ruta existe');
        return true;
    } else {
        console.log('Esta es la validación de existencia, la ruta no existe');
        return false;
    }
};

// Validar si la ruta es absoluta, sino la transformo en absoluta
const absolutePath = (userPath) => {
    if(pathModules.isAbsolute(userPath)) {
        return userPath;
    } else {
        return pathModules.resolve(userPath);
    }
};

module.exports = {
    existPath,absolutePath
};