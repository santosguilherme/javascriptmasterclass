Exercício: 2
Título: Validate
Tempo: 15 minutos

Instruções:

1 - Crie um objeto chamado "tables"
2 - Dentro do objeto "tables", crie um outro objeto chamado "author".
3 - Dentro do objeto "author", crie um outro Object chamado "model", onde as suas chaves representam os nomes das colunas e os valores, os tipos das colunas.

As colunas da tabela "author" são: 

id      -> number
name    -> string
age     -> number
city    -> string
state   -> string
country -> string

4 - Analise os dados obtidos após o processo de Parse e faça a validação do nome da tabela, nome das coluna selecionada e nome da coluna utilizada na cláusula, lancando um erro caso alguma inconsistência seja encontrada.

Resultado esperado:

Objeto "tables" criado.
Erros sendo lançados caso a query tenha alguma inconsistência relacionada ao nome das colunas e nome da tabela.

Testes:

try {
	let query = "select nome from author where age = 45";
	...
catch (e) {
	console.log((e === "A coluna nome não existe na tabela author") ? "OK" : "FAIL");	
}

Dicas: 

Percorra as colunas com for/of e utilize a notação de [] para localizar dinamicamente a tabela, utilizando o operador "in" para consultar se a coluna existe. A mensagem de erro pode ser montada com Template Literals para facilitar a interpolação de variáveis.

Conteúdo abordado neste exercício:

* Object
* in
* for/of
* Template Literals
* throw
* try
* catch