Exercício: 4
Tempo: 10 minutos

Instruções:

Separe as etapas do processo em 4 funções: 

parse (query) -> responsável por realizar o parse da query, retornando um objeto contendo as propriedades: columns, table e clauses.

validate (tables, parsedQuery) -> responsável por validar a query, não retornando nada ou lançando uma mensagem de erro em caso de problemas.

process (tables, parsedQuery) -> responsável por processar a query, retornando os dados.

execute(tables, query) -> responsável por orquestrar as chamadas para as funções: parse, validate e process.

Resultado esperado:

[ { id: 1, name: 'Douglas Crockford', age: 62 },
  { id: 2, name: 'Linus Torvalds', age: 47 } ]

Dica: 

Utilize object shorthand notation para montar o objeto de retorno.

Conteúdo abordado neste exercício:

* Function