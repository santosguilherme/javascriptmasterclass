function* sum() {
  try {
  let total = 0;
  while(true) {
    total += yield total;
  }
  } catch (e) {
    console.log("error");
  }
}

var sumIterative = sum();
console.log(sumIterative.next(10));
console.log(sumIterative.next(10));
console.log(sumIterative.next(10));
console.log(sumIterative.next(10));
console.log(sumIterative.next(10));
console.log(sumIterative.return());