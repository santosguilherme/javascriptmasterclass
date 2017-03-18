let tables = {
	author: {
		model: {
			name: 'string',
			age: 'number'
		},
		data: {
			name: "Douglas Crockford",
			age: 45
		}
	}
};

function Select() {
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

	this.execute = function (query) {
		let parsedQuery = parse(query);
		validate(parsedQuery);
		return extract(parsedQuery);
	}
};

function Update() {
	function parse (query) {
		let parsedQuery = query.replace(/(update|set)/g, "@");
		let tokenizedQuery = parsedQuery.match(/@([a-zA-Z0-9 ,=]+)/g);
		let table = tokenizedQuery[0].replace(/[@ ]*/g, "");
		let columns = tokenizedQuery[1].replace(/[@ ]*/g, "").split(",");
		let change = {};
		for (let column of columns) {
			let parts = column.split(/\=/);
			change[parts[0]] = parts[1];
		}
		console.log(change);
		return {table, change};
	}

	function validate (parsedQuery) {
		for(let column in parsedQuery.change) {
			if (column in tables[parsedQuery.table].model) continue;
			throw `A coluna ${column} não existe na tabela ${parsedQuery.table}`
		}
	}

	function update (parsedQuery) {
		for(let column in parsedQuery.change) {
			tables[parsedQuery.table].data[column] = parsedQuery.change[column];
		}
	}

	this.execute = function (query) {
		let parsedQuery = parse(query);
		validate(parsedQuery);
		update(parsedQuery);
	}
};

let select = new Select();
let result = select.execute("select name, age from author where age = 45");
console.log(result);

let update = new Update();
update.execute("update author set name = Linus Torvalds, age = 50");

console.log(tables);