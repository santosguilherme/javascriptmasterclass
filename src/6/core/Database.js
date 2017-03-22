import CommandFactory from "./../command/CommandFactory";

export default class Database {
	constructor(name) {
		this.name = name;
		this.tables = {};
	}

	execute(statement) {
		let command = CommandFactory.build(statement);
		command.tables = this.tables;
		return command.execute(statement);	
	}
};