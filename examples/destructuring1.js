let cars = ["Ka", "Palio", "Corsa", "Fusion", "A3"];

// let ka = cars[0];
// let palio = cars[1];
// let corsa = cars[2];

let [ka, palio, corsa = "Tipo", ...others] = cars;

console.log(ka, palio, corsa, others);