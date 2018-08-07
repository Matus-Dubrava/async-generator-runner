const fetch = require('node-fetch');

run(function *gen() {
  const data = yield fetch('http://localhost:3000');
  const obj = yield data.json();
  const value = yield obj.value;
  console.log(value);
});

function run(fn) {
  const iterator = fn();
  const iteration = iterator.next();

  function iterate(iteration) {
    const promise = Promise.resolve(iteration.value);
    if (iteration.done) { return iteration.value; }
    promise.then((v) => { iterate(iterator.next(v)); });
  }

  iterate(iteration);
}
