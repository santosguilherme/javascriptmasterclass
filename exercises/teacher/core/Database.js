import Table from './Table';

export default class Database {
	constructor(name = "New Database") {
		this.name = name
		this.tables = {};
	}

	create(statement) {
		let exp = /create table ([a-z]+) \(([a-z\s,]+)\)/;
		let [,tableName,columns] = statement.match(exp);
		columns = columns.split(/,\s/);

		this.tables[tableName] = new Table();

		for(let column of columns) {
			let parts = column.split(" ");
			Object.assign(this.tables[tableName].columns, {[parts[0]]: parts[1]});
		}
	};
	
	insert(statement) {
		let exp = /insert into ([a-z]+) \(([a-z\s,]+)\) values \(([a-zA-Z0-9\s,]+)\)/;
		let [,tableName, columns, values] = statement.match(exp);
		columns = columns.split(/,\s/);
		values = values.split(/,\s/);
		let obj = {};
		for(let i = 0; i < columns.length; i++) {
			Object.assign(obj, {
				[columns[i]]: values[i]
			});
		}
		this.tables[tableName].data.push(obj);
	};
	
	select(statement) {
		let exp = /select ([a-z\s,]+) from ([a-z]+)(?: where (.*))?/;
		let [,columns, tableName, clauses] = statement.match(exp);
		columns = columns.split(/,\s/);
		clauses = clauses.split("and ");
		let clausesArray = [];
		for(let clause of clauses) {
			let [column, operator, value] = clause.split(" ");
			clausesArray.push({column, operator, value});
		}
		if (!(tableName in this.tables)) throw `A tabela ${tableName} não existe`;
		{columns, tableName};
		let result = [];
		for(let row of this.tables[tableName].getData(clausesArray)) {
			var obj = {};
			for(let column of columns) {
				Object.assign(obj, {[column]: row[column]});
			}
			result.push(obj);
		}
		return result;
	};
	
	execute(statement) {
		var that = this;
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				let exp = /(create|select|insert)/;
				let [command] = statement.match(exp);
				if (!command) return;
				resolve(that[command](statement));
			}, (Math.floor(Math.random() * 1000)));
		});

	}
};