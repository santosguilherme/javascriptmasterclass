Crie um Object chamado "tables", e dentro dele, crie um outro Object chamado "author", e dentro dele, crie um outro Object chamado "model", onde as suas chaves representam os nomes das colunas e os valores, os tipos das colunas.

As colunas são: name (string), age (number), city (string), state (string).

Com base neste objeto, faça a validação do nome da tabela, nome das coluna selecionada e nome da coluna utilizada na cláusula, lancando um erro caso alguma coisa esteja errada.

Dicas: Percorra as colunas com for/of e utilize a notação de [] para localizar dinamicamente a tabela, utilizando o operador "in" para consultar se a coluna existe. A mensagem de erro pode ser montada com Template Literals para facilitar a interpolação de variáveis.