const frutas = ['morango', 'banana', 'laranja', 'abacaxi', 'manga'];
const saladaDeFrutas = {};

for (var index = 0; index < (frutas.length - 1); index++) {
  saladaDeFrutas[frutas[index]] = (function () {
    console.log(`Meu nome é ${this.fruta}`);
  }).bind({fruta: frutas[index]});
}

//let - cria um novo contexto de execução
for (let index = 0; index < (frutas.length - 1); index++) {
  saladaDeFrutas[frutas[index]] = function () {
    console.log(`Meu nome é ${frutas[index]}`);
  };
}

saladaDeFrutas.morango();
saladaDeFrutas.banana();
saladaDeFrutas.laranja();
saladaDeFrutas.abacaxi();
