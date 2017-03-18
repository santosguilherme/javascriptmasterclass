class Command {
	execute() {
		this.parse();
		this.validate();
	}
}

class Select extends Command {

	parse() {
		console.log("select parse");
	}

	validate() {
		console.log("select validate");
	}
}

class Update extends Command {

	parse() {
		console.log("update parse");
	}

	validate() {
		console.log("update validate");
	}
}

let update = new Update();
update.execute();

let select = new Select();
select.execute();