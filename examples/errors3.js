function InvalidParameter (message) {
	this.name = "Invalid Parameter";
	this.message = message;
}


function sum(a, b) {
	if (!a || !b) throw new InvalidParameter("a e b não podem ser vazios.");
	return a + b;
}

try {
	console.log(sum(2, 2));
} catch (e) {
	console.log(e.message);
} finally {
	console.log("OK");
}