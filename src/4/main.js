let tables = {
	author: {
		model: {
			name: 'string',
			age: 'number'
		},
		data: {
			name: "Douglas Crockford",
			age: 50
		}
	}
};

function parse (query) {
	let parsedQuery = query.replace(/(select|from|where)/g, "@");
	let tokenizedQuery = parsedQuery.match(/@([a-z0-9 ,=]+)/g);
	let columns = tokenizedQuery[0].replace(/[@ ]*/g, "").split(",");
	let table = tokenizedQuery[1].replace(/[@ ]*/g, "");
	let clausules = tokenizedQuery[2].replace(/[@ ]*/g, "");
	return {columns, table, clausules};
}

function validate (parsedQuery) {
	for(let column of parsedQuery.columns) {
		if (column in tables[parsedQuery.table].model) continue;
		throw `A coluna ${column} não existe na tabela ${parsedQuery.table}`
	}
}

function extract (parsedQuery) {
	var result = {};
	for(let column of parsedQuery.columns) {
		Object.assign(result, {[column]: tables[parsedQuery.table].data[column]});
	}
	return result;
}

function execute(query) {
	let parsedQuery = parse(query);
	validate(parsedQuery);
	return extract(parsedQuery);
}

let query = "select name, age from author where age = 45";
let result = execute(query);
console.log(result);