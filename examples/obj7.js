var netflixOriginals = {
	distributor: "Netflix"
};

var narcos = {
	title: "Narcos",
	seasons: 2
};

Object.setPrototypeOf(narcos, netflixOriginals);

var billions = {
	title: "Billions",
	seasons: 2,
	__proto__: netflixOriginals
};

console.log(narcos.distributor);
console.log(billions.distributor);

var theOA = Object.create(netflixOriginals);
Object.assign(theOA,{
	title: "The OA",
	seasons: 1
});

console.log(theOA.distributor);







