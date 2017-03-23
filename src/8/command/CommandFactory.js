import Select from "./Select";
import CreateTable from "./CreateTable";
import Insert from "./Insert";
import Update from "./Update";

export default class CommandFactory {
	static build(statement) {
		if (statement.startsWith("create table")) return new CreateTable();
		if (statement.startsWith("insert")) return new Insert();
		if (statement.startsWith("select")) return new Select();
		if (statement.startsWith("update")) return new Update();
	}
}