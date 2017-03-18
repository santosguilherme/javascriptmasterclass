#JavaScript Masterclass#
##Exercícios##

Ao longo do treinamento, vamos construir, passo a passo, um interpretador para a linguagem SQL, com o objetivo de interagir com um modelo de objetos.

...

1 - Dada a query: "select name, age from author where age = 45", extraia a coluna "name" e "age", a tabela "author" e a cláusula "age = 45".

Dicas: Explore a API da String, podendo utilizar as operações match, replace e split associado com uma RegExp. Outras operações como trim, podem ser úteis.

Saída: columns = "name,age", table = "author", clausules = "age=45"

2 - Crie um Object chamado "tables", e dentro dele, crie um outro Object chamado "author", e dentro dele, crie um outro Object chamado "model", onde as suas chaves representam os nomes das colunas e os valores, os tipos das colunas.

As colunas são: name (string), age (number), city (string), state (string).

Com base neste objeto, faça a validação do nome da tabela, nome das coluna selecionada e nome da coluna utilizada na cláusula, lancando um erro caso alguma coisa esteja errada.

Dicas: Percorra as colunas com for/of e utilize a notação de [] para localizar dinamicamente a tabela, utilizando o operador "in" para consultar se a coluna existe. A mensagem de erro pode ser montada com Template Literals para facilitar a interpolação de variáveis.

3 - Dentro do objeto "tables" e dentro do objeto "author", crie um objeto chamado "data", contendo apenas um objeto. Retorne um objeto contendo apenas as colunas selecionadas.

Dicas: Percorra as colunas com for/of e utilize a notação de [] tanto para definir as propriedades em um objeto de retorno quanto para buscar os valores armazenados na tabela. Lembra-se que você pode utilizar Object.assign(obj, {key: value}) para definir novas propriedades em um objeto.

4 - Separe as etapas do processo em 4 funções: 

parse (query) -> responsável por realizar o parse da query, criando um objeto contendo columns, table e clausules.

Dica: Utilize object shorthand notation para montar o objeto de retorno

validate (tables, parsedQuery) -> responsável por validar a query, retornando undefined ou lançando uma mensagem de erro.

extract (tables, parsedQuery) -> responsável por extrair os dados em um objeto contendo as colunas selecionadas.

execute(query) -> responsável por orquestrar as chamadas para parse, validate e extract.

5 - Dada a query: "update author set name = 'Linus Torvals', age = 45", implemente a execução do comando update.