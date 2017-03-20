let tables = {
	author: {
		model: {
			name: 'string',
			age: 'number',
			city: 'string',
			state: 'string'
		},
		data: [{
			name: "Douglas Crockford",
			age: 62,
			city: "Frostbite Falls",
			state: "Minesotta",
			country: "United States"
		},
		{
			name: "Linus Torvalds",
			age: 47,
			city: "Helsinki",
			state: "Uusimaa",
			country: "Finland"
		}]
	}
};

function parse (query) {
	let parsedQuery = query.replace(/(select|from|where)/g, "@");
	let tokenizedQuery = parsedQuery.match(/@([a-z0-9 ,=]+)/g);
	let columns = tokenizedQuery[0].replace(/[@ ]*/g, "").split(",");
	let table = tokenizedQuery[1].replace(/[@ ]*/g, "");
	return {columns, table};
}

function validate (parsedQuery) {
	if (!(parsedQuery.table in tables)) throw `A tabela ${parsedQuery.table} não existe`;
	for(let column of parsedQuery.columns) {
		if (column in tables[parsedQuery.table].model) continue;
		throw `A coluna ${column} não existe na tabela ${parsedQuery.table}`
	}
}

function process (parsedQuery) {
	var results = [];
	for(let row of tables[parsedQuery.table].data) {
		var result = {};
		for(let column of parsedQuery.columns) {
			Object.assign(result, {[column]: row[column]});
		}
		results.push(result);
	}
	return results;
}

function execute(query) {
	let parsedQuery = parse(query);
	validate(parsedQuery);
	return process(parsedQuery);
}

let query = "select name, age from author";
let result = execute(query);
console.log(result);