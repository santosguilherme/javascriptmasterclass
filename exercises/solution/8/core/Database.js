import CommandFactory from "./../command/CommandFactory";

export default class Database {
	constructor(name) {
		this.name = name;
		this.tables = {};
	}

	execute(statement) {
		let command = CommandFactory.build(statement);
		command.tables = this.tables;
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				try {
					let result = command.execute(statement);	
					resolve(result);
				} catch (e) {
					reject(e);
				}
			}, Math.floor(Math.random() * 10));
		});
	}
};