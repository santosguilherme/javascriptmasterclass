const SQL_COMMAND = 'create table author (id number, name string, city string, state string, country string)';

const extracted = SQL_COMMAND.match(/^create table ([a-z]+) \(([a-z\s,]+)\)$/);

//Extraia o nome da tabela e armazene em uma variável chamada "tableName"
const tableName = extracted[1];

//Extraia as colunas da tabela e armazene em uma variável chamada "columns"
let columns = extracted[2];

//Manipule a variável "columns", removendo os parênteses e separando cada coluna, com seu respectivo tipo, em uma string separada.
columns = columns.split(/,\s?/);

console.log('tableName', tableName, 'columns', columns);
