Exercício: 2
Tempo: 15 minutos

Instruções:

Dada a query: "create table author (id number, name string, city string, state string, country string)"

1 - Extraia o nome das tabelas e as colunas.
2 - Crie um objeto chamado "database".
2 - Dentro do objeto "database", crie um objeto chamado "tables".
3 - Dentro do objeto "tables", crie um objeto com o nome da tabela.
4 - Dentro do objeto criado com o nome da tabela, crie um objeto chamado "columns", onde as chaves são representadas pelo nome da coluna e o valor com o tipo da coluna.
4 - Dentro do objeto criado com nome da tabela, crie um array chamado "data".

Resultado:

{
	"tables": {
		"author": {
			"columns": {
				"id": "number",
				"name": "string",
				"age": "number",
				"city": "string",
				"state": "string",
				"country": "string"
			},
			"data": []
		}
	}
}


Dicas: 

Explore ao máximo as operações disponíveis na String API como: match, replace e split, juntamente com expressões regulares.

Conteúdo abordado neste exercício: 

* Object