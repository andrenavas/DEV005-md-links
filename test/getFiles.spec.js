const { mdToHtml } = require ('../src/helpers/getFiles.js');

// Funcion validate
it('debería validar los enlaces ,mostrarme href, text y file', () => {
    const arrayLinks = [
      { href: 'https://www.google.com', text: 'Enlace a Google', file: 'prueba/one.md' },
      { href: 'https://www.youtube.com/watch?v=95BFumHfwAA', text: 'Enlace a youtube', file: 'prueba/three.md' },
    ];
    // Mockear la función fetch para simular que la respuestas sea exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      statusText: 'OK'
    });
    // Llamar a la función 
    return validate(arrayLinks)
      .then(() => {
        expect(arrayLinks).toEqual([
          { href: 'https://www.google.com', text: 'Enlace a Google', file: 'prueba/one.md', status: 200, statusText: 'OK' },
          { href: 'https://www.youtube.com/watch?v=95BFumHfwAA', text: 'Enlace a youtube', file: 'prueba/three.md', status: 200, statusText: 'OK' },
        ]);
      });
  });