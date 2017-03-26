class Shape {
	constructor(type) {
		this.type = type;
	}

	get type() {
		return this._type;
	}

	set type(type) {
		if (!type) throw "Type is required";
		this._type = type;
	}
}

class Square extends Shape {
	constructor(a,b) {
		super("Square");
		this._a = a;
		this._b = b;
	}

	get area() {
		return this._a * this._b;
	}
}

let square = new Square(2,2)
console.log(square.area);
console.log(square instanceof Square);
console.log(square instanceof Shape);
console.log(square instanceof Object);
console.log(square);






