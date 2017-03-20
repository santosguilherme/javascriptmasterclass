Separe as etapas do processo em 4 funções: 

parse (query) -> responsável por realizar o parse da query, criando um objeto contendo columns, table e clausules.

Dica: Utilize object shorthand notation para montar o objeto de retorno

validate (tables, parsedQuery) -> responsável por validar a query, retornando undefined ou lançando uma mensagem de erro.

extract (tables, parsedQuery) -> responsável por extrair os dados em um objeto contendo as colunas selecionadas.

execute(query) -> responsável por orquestrar as chamadas para parse, validate e extract.