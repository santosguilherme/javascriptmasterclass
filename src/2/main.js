let query = "select name, age from author where age = 45";

let parsedQuery = query.replace(/(select|from|where)/g, "@");

let tokenizedQuery = parsedQuery.match(/@([a-z0-9 ,=]+)/g);

let columns = tokenizedQuery[0].replace(/[@ ]*/g, "").split(",");
let table = tokenizedQuery[1].replace(/[@ ]*/g, "");
let clausules = tokenizedQuery[2].replace(/[@ ]*/g, "");

let tables = {
	author: {
		model: {
			name: 'string',
			age: 'number'
		}
	}
};

for(let column of columns) {
	if (column in tables[table].model) continue;
	throw `A coluna ${column} não existe na tabela ${table}`
}