### Exercício 2

#### Tempo
15 minutos

#### Instruções

Dada o comando:

_create table author (id number, name string, city string, state string, country string)_

1. Crie um objeto chamado "database".
2. Dentro do objeto "database", crie um objeto chamado "tables".
3. Dentro do objeto "tables", crie um objeto com o nome da tabela.
4. Dentro do objeto criado com o nome da tabela, crie um objeto chamado "columns", onde as chaves são representadas pelo nome da coluna e o valor com o tipo da coluna.
5. Dentro do objeto criado com nome da tabela, crie um array chamado "data".

#### Resultado

```javascript
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
```

#### Dicas

> Percorra as colunas com for/of e utilize a notação de [] tanto para acessar os elementos do array quanto para criar as propriedades nos objetos.

#### Conteúdo abordado neste exercício

* Object
* Manipulação dinâmica das propriedades dos objetos
* for/of
* Array
* String.prototype.trim()