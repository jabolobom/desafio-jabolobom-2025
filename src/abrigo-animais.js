import {animalArray} from "./animais-init.js"
import {Animal} from "./animais-init.js"

class AbrigoAnimais {

  validarBrinquedos(brinquedoString){
    const brinquedosValidos = ["RATO", "BOLA", "LASER", 
      "CAIXA", "NOVELO", "SKATE"]

    const brinquedoList = brinquedoString.split(",").map(s => s.trim());
    const brinquedoSet =  new Set(brinquedoList); // set nao repete, logo remove os repetidos

    if (brinquedoSet.size !== brinquedoList.length) {return false} // repetidos

    for (const x of brinquedoList){
      if(!brinquedosValidos.includes(x)){ // se x de brinquedo lista nao esta na lista de validos
        return false; // retorna invalido
      }
    }

    return true; // todos validos
  }

// ex. caso valido: 'RATO,BOLA','RATO,NOVELO', 'Rex,Fofo'
// ou seja, recebe duas """tuplas""" (semelhante a isso) com brinquedos em x,y ordem, pede pra testar a,b animais
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais){
    try {
      // mapeia separado por , e apaga espaços em branco
      const splitInput = ordemAnimais.split(",").map(s => s.trim()); 
      
      // controle
      let resultados = [] // pra retornar em ordem
      let pessoa1adotados = 0; // limitar quantos podem ser adotados
      let pessoa2adotados = 0;
      let brinquedosUsados1 = []; // checar se o gato pode ser adotado
      let brinquedosUsados2 = [];

      // validacao brinquedos
      if (!this.validarBrinquedos(brinquedosPessoa1)){
        throw new Error("Brinquedo inválido")
      }
      if (!this.validarBrinquedos(brinquedosPessoa2)){
        throw new Error("Brinquedo inválido")
      }

      // validacao animal UNICO ou nenhum animal inserido, poderia colocar em uma funcao separada pra ficar mais limpo.
      if (splitInput.length < 1){
        throw new Error("Animal inválido");
      }
      const unico = new Set(splitInput); // cria set (sem repeticao)
      if (unico.size !== splitInput.length){ // se algum sumir é porque repetiu
        throw new Error("Animal inválido")
      }

      // como a quantidade de animais no input varia:
      // mapeia cada elemento da lista splitinput (valores separados) 
      // em um elemento da animalArray (tipo um pointer)
      const animalInstances = splitInput.map(name => { 
        const instance = animalArray.find(a => a.nome === name); // checa se o "name" bate com o "nome" da instancia do animal

        // se não existir na lista de animais já inicializados:
        if (!instance) throw new Error('Animal inválido');

        return instance // retorna lista de animais com instancia no objeto Animais
      })

      for (const item of animalInstances){
        let resultado; // cria variavel

        if (item.tipo === "jabuti"){ // check diferente pra jabuti, ja que nao se importa com ordem
          resultado = item.jabutiCheck(brinquedosPessoa1, brinquedosPessoa2, pessoa1adotados, pessoa2adotados);
        }
        else {
          resultado = item.toyCheck(brinquedosPessoa1, brinquedosPessoa2, pessoa1adotados, pessoa2adotados);
        }

        if (item.tipo === "gato"){  // check adicional pra gato, ver se os brinquedos estao repetidos
          resultado = item.toyCheck(brinquedosPessoa1, brinquedosPessoa2, pessoa1adotados, pessoa2adotados);
          if (resultado === "pessoa 1" && item.gatoCheck(brinquedosUsados1)){
            resultado = false;
          }
          else if (resultado === "pessoa 2" && item.gatoCheck(brinquedosUsados2)){
            resultado = false; // testar para ambas pessoas
          }
        }

        const favoritos = item.brinquedosfav.split(',').map(s => s.trim()) // separa os favoritos do animal atual
        // faz uma lista deles

        if (resultado === "pessoa 1"){
            resultados.push(`${item.nome} - pessoa 1`);
            pessoa1adotados++;
            brinquedosUsados1.push(...favoritos) // cada elemento de favoritos é inserido na lista de usados
            // magia da sintaxe "...". Objetivo desses checks é limitar a adoção de gatos
        }
        else if (resultado === "pessoa 2"){
          resultados.push(`${item.nome} - pessoa 2`);
            pessoa2adotados++;
            brinquedosUsados2.push(...favoritos)
        }
        else {
          resultados.push(`${item.nome} - abrigo`); // se nao tem pessoa compativel, vai pro abrigo.
        }
      }

      // "O programa deve retornar uma estrutura contendo a lista em ordem 
      // alfabética dos animais e com quem ficaram ou a mensagem de erro, se houver"
      resultados.sort();
      return { lista: resultados, erro: false }; // retorna lista
    } catch (e){
      return { lista: false, erro: e.message}; // se erro, retorna o erro
    }
}
}

const teste = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');

console.log(teste); // testar no terminal

export { AbrigoAnimais as AbrigoAnimais };