function _fibo(n, a, b) {
  return new Promise((resolve, reject) => {
    if (n === 0) { resolve({ res: b, done: true }); }
    if (n === 1) { resolve({ res: a + b, done: true }); }
    resolve({ n: n - 1, a: b, b: a + b, done: false });
  });
}

function fibo(n) {
  return new Promise((resolve, reject) => {
    const a = 0,
          b = 1;

    const iteration = { n, a: 0, b: 1, done: false };

    (function iterate(iteration) {
      if (iteration.done) { return resolve(iteration.res); }
      _fibo(iteration.n, iteration.a, iteration.b)
        .then(iterate);
    })(iteration);
  });
}

fibo(6).then((v) => console.log(v));
console.log('done');
