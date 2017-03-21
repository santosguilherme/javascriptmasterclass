export default class Command {
	execute(query) {
		let parsedQuery = this.parse(query);
		this.validate(parsedQuery);
		return this.executeCommand(parsedQuery);
	}
}