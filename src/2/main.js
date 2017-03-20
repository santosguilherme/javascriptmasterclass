try {
	let query = "select nome from author";

	let parsedQuery = query.replace(/(select|from|where)/g, "@");

	let tokenizedQuery = parsedQuery.match(/@([a-z0-9 ,=]+)/g);

	let columns = tokenizedQuery[0].replace(/[@ ]*/g, "").split(",");
	let table = tokenizedQuery[1].replace(/[@ ]*/g, "");

	let tables = {
		author: {
			model: {
				name: 'string',
				age: 'number',
				city: 'string',
				state: 'string'
			}
		}
	};

	if (!(table in tables)) throw `A tabela ${table} não existe`;

	for(let column of columns) {
		if (column in tables[table].model) continue;
		throw `A coluna ${column} não existe na tabela ${table}`
	}
} catch (e) {
	console.log((e === "A coluna nome não existe na tabela author") ? "OK" : "FAIL");
}