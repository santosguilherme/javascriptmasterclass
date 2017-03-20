let query = "select name, age from author where age = 45";

let parsedQuery = query.replace(/(select|from|where)/g, "@");

let tokenizedQuery = parsedQuery.match(/@([a-z0-9 ,=]+)/g);

let columns = tokenizedQuery[0].replace(/[@ ]*/g, "").split(",");
let table = tokenizedQuery[1].replace(/[@ ]*/g, "");
let clauses = tokenizedQuery[2].replace(/[@ ]*/g, "").split("and");

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

for(let column of columns) {
	if (column in tables[table].model) continue;
	throw `A coluna ${column} não existe na tabela ${table}`
}

var results = [];
for(let row of tables[table].data) {
	var result = {};
	for(let column of columns) {
		Object.assign(result, {[column]: row[column]});
	}
	results.push(result);
}

console.log(results);