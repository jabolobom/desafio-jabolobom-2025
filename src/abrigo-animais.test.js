import {AbrigoAnimais} from "./abrigo-animais.js"; 
// tive que botar o .js pra funcionar

// adicionei console.logs pra me ajudar a debugar
describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    console.log(resultado);
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      console.log(resultado);
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      console.log(resultado);
      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Uma pessoa não pode levar mais de três animais para casa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'LASER,RATO,BOLA,SKATE,CAIXA,NOVELO',
      'LASER, BOLA, RATO', 'Rex, Bola, Loco, Bebe');

      console.log(resultado);
      expect(resultado.lista[0]).toBe('Bebe - abrigo'); // ultimo a ser checado, fica de fora
      expect(resultado.lista[1]).toBe('Bola - pessoa 1');
      expect(resultado.lista[2]).toBe('Loco - pessoa 1');
      expect(resultado.lista[3]).toBe('Rex - pessoa 1');
  });

  test('Jabuti (Loco) não pode ser adotado sozinho', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE, RATO, BOLA', 'SKATE, BOLA', 'Loco, Rex');
    
    console.log(resultado, "loco foi checado antes de rex ser adotado");
    expect(resultado.lista[0]).toBe('Loco - abrigo'); // vai pro abrigo, pois foi checado primeiro
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');

    const resultado2 = new AbrigoAnimais().encontraPessoas(
      'SKATE, RATO, BOLA', 'SKATE, BOLA', 'Rex, Loco');

    console.log(resultado2, "loco foi checado depois de rex ser adotado");
    expect(resultado2.lista[0]).toBe('Loco - pessoa 1'); // adotado, pois ja havia outro
    expect(resultado2.lista[1]).toBe('Rex - pessoa 1'); 
  })

  test('Jabuti (Loco) não se importa com a ordem desde que tenha um amigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO, SKATE, BOLA', 'SKATE, BOLA', 'Rex, Loco');

    console.log(resultado);
    expect(resultado.lista[0]).toBe('Loco - pessoa 1'); 
    expect(resultado.lista[1]).toBe('Rex - pessoa 1'); 
  })

  test('Gatos não dividem seus brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA, RATO, LASER', 'SKATE, LASER', 'Mimi, Fofo');

      console.log(resultado, "Fofo nao quer dividir");
      expect(resultado.lista[0]).toBe('Fofo - abrigo')
      expect(resultado.lista[1]).toBe('Mimi - pessoa 1') // fofo nao divide
  })

  test("Se ambas as pessoas tiverem condições de adoção, ninguém fica com o animal (tadinho)", () =>
  {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO, BOLA", "RATO, BOLA", "Rex");

      console.log(resultado, "Rex nao sera adotado por nenhum");
      expect(resultado.lista[0]).toBe('Rex - abrigo');
  })

  test("Animal duplicado gera erro", () =>
  {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO, BOLA", "RATO, BOLA", "Rex, Rex");

      console.log(resultado);
      expect(resultado.erro).toBe('Animal inválido');
  })

  test("Brinquedo duplicado gera erro", () =>
  {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA, BOLA", "RATO, SKATE", "Rex");

      console.log(resultado);
      expect(resultado.erro).toBe('Brinquedo inválido');
  })

  test("Brinquedo fora da lista gera erro", () =>
  {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "PLAYSTATION, BOLA", "RATO, SKATE", "Rex");

      console.log(resultado);
      expect(resultado.erro).toBe('Brinquedo inválido');
  })
});

