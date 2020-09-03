function applyMiddleWare(...args) {
  // your code here
  const raw = args.shift();
  const compose = (rest) => rest.reduce((fna, fnb) => (...params) => fna(fnb(...params)))
  const chain = compose(args.reverse());
  // console.log(chain);
  return chain(raw);

}