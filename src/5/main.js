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

function Select(tables) {
	function parse (query) {
		let parsedQuery = query.replace(/(select|from)/g, "@");
		let tokenizedQuery = parsedQuery.match(/@([a-z0-9 ,=]+)/g);
		let columns = tokenizedQuery[0].replace(/[@ ]*/g, "").split(",");
		let table = tokenizedQuery[1].replace(/[@ ]*/g, "");
		return {columns, table};
	}

	function validate (parsedQuery) {
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

	this.execute = function (query) {
		let parsedQuery = parse(query);
		validate(parsedQuery);
		return process(parsedQuery);
	}
};

function Update(tables) {
	function parse (query) {
		let parsedQuery = query.replace(/(update|set)/g, "@");
		let tokenizedQuery = parsedQuery.match(/@([a-zA-Z0-9 ,=]+)/g);
		let table = tokenizedQuery[0].replace(/[@ ]*/g, "");
		let columns = tokenizedQuery[1].replace(/[@]*/g, "").split(",");
		let change = {};
		for (let column of columns) {
			let parts = column.split(/\=/);
			change[parts[0].trim()] = parts[1].trim();
		}
		return {table, change};
	}

	function validate (parsedQuery) {
		for(let column in parsedQuery.change) {
			if (column in tables[parsedQuery.table].model) continue;
			throw `A coluna ${column} não existe na tabela ${parsedQuery.table}`
		}
	}

	function process (parsedQuery) {
		for(let row of tables[parsedQuery.table].data) {
			for(let column in parsedQuery.change) {
				row[column] = parsedQuery.change[column];
			}
		}
	}

	this.execute = function (query) {
		let parsedQuery = parse(query);
		validate(parsedQuery);
		process(parsedQuery);
	}
};

let select = new Select(tables);
console.log(select.execute("select name, age from author"));

let update = new Update(tables);
update.execute("update author set name = Martin Fowler, age = 54");

console.log(select.execute("select name, age from author"));