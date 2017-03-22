### Exercício 6

####Tempo
30 minutos

####Instruções

Parte 1

1. Crie um diretório chamado "core"
2. Dentro do diretório "core", crie um arquivo chamado "Database.js"
3. Mova a classe Database para o módulo "Database.js"
4. Faça a exportação da class Database no módulo Database.js
5. Faça a importação da class Database no módulo main.js

Parte 2

1. Crie um diretório chamado "command"
2. Crie uma classe chamada "Command" e dentro dela um método chamado "execute"
3. O método execute é um Template Method, ou seja, ele define o comportado que deverá ser executado por uma classe que estende a classe "Command". O método deve invocar 3 outros métodos: parse, validate e process
4. Extraia cada comando para uma classe específica, que estende a classe "Command"
5. Divida a lógica de cada comando em 3 métodos: parse, validate e process

#### Dicas

#### Conteúdo abordado neste exercício

* Modules
* export
* default
* import