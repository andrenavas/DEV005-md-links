const { readAllMds, getFiles, validate, readFile } = require ('../src/getFiles.js');

//FUNCION getFilesMd
describe('getFilesMd', () => {
  it("Deberia ser una función", () => {
    expect(typeof getFiles).toBe("function");
  });

  it('Debe devolver un array con el contenido de la carpeta', () => {
    const filePath = 'src/prueba'; 
    const result = getFiles(filePath);
    expect(result).toEqual([
      "src\\prueba\\prueba.md",
      "src\\prueba\\pruebita\\lapruebadelapruebita\\lapruebadelapruebita.md",
      "src\\prueba\\pruebita\\pruebita.md"
    ]);
  });
});


//FUNCION ALLMds
describe('readAllMds', () => {
  it('Debería ser una función', () => {
    expect(typeof readAllMds).toBe('function');
  });
  it('Deberia retornar un array de links', () => {
    const arrayFiles = ['C:\\Users\\famil\\DEV005-md-links\\src\\prueba\\prueba.md',];

    return readAllMds(arrayFiles).then((result) => {

      expect(result).toEqual([[
        {
          href: 'https://nodejs.org/es/',
          text: 'Node.js',
          file: 'C:\\Users\\famil\\DEV005-md-links\\src\\prueba\\prueba.md'
        },
      ]])
    });
  });
});

  //Función readFiles
  describe('readFile', () => {
    it('Deberia ser una función', () => {
      expect( typeof readFile).toBe('function');
    })
  // a esta le aplque lo mismo que arriba la de mdlink que devuelva promesa
    it("Deberia resolver la promesa ,cuando al leer el archivo es exitoso", ()=>{
      const filePath = "src/prueba/prueba.md";
      expect(readFile(filePath)).toBeInstanceOf(Promise);   
    });
  });

  // Funcion validate
  it('debería validar los enlaces ,mostrarme href, text y file', () => {
  const arrayLinks = [
    { href: 'https://nodejs.org/es/', text: 'Node.js', file: 'C:\\Users\\famil\\DEV005-md-links\\src\\prueba\\prueba.md' },
    { href: 'https://jestjs.io/', text: 'Jest', file: 'C:\\Users\\famil\\DEV005-md-links\\src\\prueba\\pruebita\\lapruebadelapruebita\\lapruebadelapruebita.md' },
  ];
  // Mockear la función fetch para simular que la respuestas sea exitosa
  global.fetch = jest.fn().mockResolvedValue(Promise.resolve({
    status: 200,
    statusText: 'OK'
  }));
  // Llamar a la función
  return validate(arrayLinks)
    .then(() => {
      expect(arrayLinks).toEqual([
        {
          href: 'https://nodejs.org/es/',
          text: 'Node.js',
          file: 'C:\\Users\\famil\\DEV005-md-links\\src\\prueba\\prueba.md',
          status: 200,
          statusText:'OK',
        },
        {
          href: 'https://jestjs.io/',  
          text: 'Jest',
          file: 'C:\\Users\\famil\\DEV005-md-links\\src\\prueba\\pruebita\\lapruebadelapruebita\\lapruebadelapruebita.md',
          status: 200,
          statusText:'OK',
        },
      ]);
  });
});
// });