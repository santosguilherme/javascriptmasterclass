export default class Table {
	constructor() {
		this.columns = {};
		this.data = [];
	}

	getData(clauses) {
		let result = [];
		return this.data.filter(function (row) {
			let ok = true;
			for(let clause of clauses) {
				if (clause.operator === "=") {
					if(clause.value !== row[clause.column]) {
						ok = false;
						break;
					}
				}
				if (clause.operator === "<") {
					if(row[clause.column] > clause.value) {
						ok = false;
						break;
					}
				}
				if (clause.operator === ">") {
					if(row[clause.column] < clause.value) {
						ok = false;
						break;
					}
				}
			}
			return ok;
		});
	}
}