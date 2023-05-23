const { mdLinks } = require('../src/index');


describe('mdLinks', () => {

  it('Deberia ser una función',() => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Deberia devolver una promesa',() => {
    const path1 = 'src/prueba/prueba.md'
    expect(mdLinks(path1)).toBeInstanceOf(Promise);
  });

  it('Deberia rechazar la promesa cuando la ruta no existe', () => {
    return mdLinks('../prueba/archivodeprueba.md').catch((error) => {
      expect(error).toBe("Error, la ruta no existe");
    });
  });

});