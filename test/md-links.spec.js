const { mdLinks } = require('../src/index.js');
const { existPath, absolutePath } = require('../src/path.js')


describe('mdLinks', () => {

  it('Deberia ser una función',() => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Deberia devolver una promesa',() => {
    const path1 = 'src/prueba/prueba.md'
    const options = { validate: false};
    expect(mdLinks(path1, options)).toBeInstanceOf(Promise);
  });

  it('Deberia rechazar la promesa cuando la ruta no existe', () => {
    return mdLinks('../prueba/archivodeprueba.md').catch((error) => {
      expect(error.message).toBe('Error, path does not exist');
    });
  });

});

describe('absolutePath', () => {
  it("Deberia ser una función", () => {
    expect(typeof absolutePath).toBe("function");
  });

  it("Deberia devolver la ruta absoluta cuando la ruta es absoluta", () => {
    const route = 'C:/DEV005-md-links/src/prueba/prueba.md'
    const absRoute = 'C:/DEV005-md-links/src/prueba/prueba.md'
    const resultAbsRoute = absolutePath(route);
    expect(resultAbsRoute).toBe(absRoute);
  });

  it("Deberia devolver la ruta absoluta cuando la ruta es relativa", () => {
    const routeRelative = 'prueba/prueba.md'
    const absRoute = 'C:\\Users\\famil\\DEV005-md-links\\prueba\\prueba.md'
    const resultAbsRoute = absolutePath(routeRelative);
    expect(resultAbsRoute).toBe(absRoute);
  });
});

describe('existPath', () => {
  it("Deberia ser una función", () => {
    expect(typeof existPath).toBe("function");
  });

  it("Deberia retornar true si la ruta existe", () => {
    const route = 'C:\\Users\\famil\\DEV005-md-links\\src\\prueba\\prueba.md'
    const existRoute = existPath(route);
    expect(existRoute).toBe(true);
  });

  it("Deberia retornar false si la ruta no existe", () => {
    const route = 'C:/DEV005-md-links/src/prueba/archivo.md'
    const existRoute = existPath(route);
    expect(existRoute).toBe(false);
  });
});
