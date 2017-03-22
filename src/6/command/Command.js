export default class Command {
	execute(statement) {
		let parsedStatement = this.parse(statement);
		this.validate(parsedStatement);
		return this.process(parsedStatement);
	}
}