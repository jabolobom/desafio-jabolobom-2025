class Animal {
  constructor(nome, tipo, brinquedosfav){ // nome do animal, tipo, brinquedos favoritos
    this.nome = nome; 
    this.tipo = tipo;
    this.brinquedosfav = brinquedosfav;
  }

  toyCheck(brinquedosPessoa1, brinquedosPessoa2, pessoa1adotados, pessoa2adotados){

    // preciso checar se o input está na mesma ordem que "brinquedosfav"
    const favSeparados = this.brinquedosfav.split(",").map(s => s.trim().toUpperCase()); // lista de favoritos separados
    const brinquedosSeparados1 = brinquedosPessoa1.split(",").map(s => s.trim().toUpperCase());
    const brinquedosSeparados2 = brinquedosPessoa2.split(",").map(s => s.trim().toUpperCase());
    // brinquedos separados em elementos numa lista

    function testLista(inputArray){
      let index = 0 // pra cada "batida" com a lista do animal, +1,
      for (const item of inputArray){ // para cada x da lista

        if (item === favSeparados[index]){ index++; } // se bater, próximo.
        if (index === favSeparados.length){ return true; } // se todos baterem é compativel 
      }

      return false;
    }

    // feito pensado pra 2 pessoas de input, baseado no arquivo de teste, mais pessoas vai quebrar.
    let pessoa1compativel;
    let pessoa2compativel;

    if ( pessoa1adotados < 3){ pessoa1compativel = testLista(brinquedosSeparados1); }
    else{ pessoa1compativel = false;}

    if ( pessoa2adotados < 3){ pessoa2compativel = testLista(brinquedosSeparados2); }
    else{ pessoa2compativel = false; }

    if (pessoa1compativel && pessoa2compativel){ // se ambos compativeis, ninguem leva
      return false
    }

    if (pessoa1compativel) return "pessoa 1";
    if (pessoa2compativel) return "pessoa 2";

    return false // se nenhum compativel
  }

  jabutiCheck(brinquedosPessoa1, brinquedosPessoa2, pessoa1adotados, pessoa2adotados){
    const favSeparados = this.brinquedosfav.split(",").map(s => s.trim()); // lista de favoritos separados
    const brinquedosSeparados1 = brinquedosPessoa1.split(",").map(s => s.trim());
    const brinquedosSeparados2 = brinquedosPessoa2.split(",").map(s => s.trim());

    function testLista(inputArray){ // input aray sao os brinquedos separados em str
      return favSeparados.every(toy => inputArray.includes(toy));
      // se todos favoritos do jabuti estiverem no input array, retorna true
    }

    let pessoa1compativel;
    let pessoa2compativel;
  
    if (pessoa1adotados < 3 && pessoa1adotados > 0){
      pessoa1compativel = testLista(brinquedosSeparados1);
    }
    else{pessoa1compativel = false};

    
    if (pessoa2adotados < 3 && pessoa2adotados > 0){
      pessoa2compativel = testLista(brinquedosSeparados2);
    }
    else{pessoa2compativel = false};

    if (pessoa1compativel && pessoa2compativel){ return false }// se ambos compativeis, ninguem leva

    if (pessoa1compativel) return "pessoa 1";
    if (pessoa2compativel) return "pessoa 2";

    return false // se nenhum compativel
  }

  gatoCheck(brinquedosUsados){
    const favSeparados = this.brinquedosfav.split(",").map(s => s.trim()); // lista de favoritos separados, poderia declarar na classe...

    return favSeparados.some(toy => brinquedosUsados.includes(toy));
  }
}

// INICIALIZACAO DAS INSTANCIAS
// caes
const Rex = new Animal("Rex", "cao", "RATO, BOLA");
const Bola = new Animal("Bola", "cao", "CAIXA, NOVELO");
const Bebe = new Animal("Bebe", "cao", "LASER, RATO, BOLA");

// gatos;
const Mimi = new Animal("Mimi", "gato", "BOLA, LASER");
const Fofo = new Animal("Fofo", "gato", "BOLA, RATO, LASER");
const Zero = new Animal("Zero", "gato", "RATO, BOLA");

// jabuti
const Loco = new Animal("Loco", "jabuti", "SKATE, RATO");

const animalArray = [Rex, Bola, Bebe, 
    Mimi, Fofo, Zero, Loco]; // lista com as referencias pra facilitar

export { animalArray, Animal }; // exporta animal pra usar os metodos e a array pra usar como """pointer"""

// Rex 	cão 	RATO, BOLA
// Mimi 	gato 	BOLA, LASER
// Fofo 	gato 	BOLA, RATO, LASER
// Zero 	gato 	RATO, BOLA
// Bola 	cão 	CAIXA, NOVELO
// Bebe 	cão 	LASER, RATO, BOLA
// Loco 	jabuti 	SKATE, RATO