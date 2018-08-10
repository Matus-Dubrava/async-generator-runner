function factorial(n) {
  function _factorial(obj) {
    let { value, n } = obj;

    return new Promise((resolve, reject) => {
      resolve({ value: value * n, n: n - 1 });
    });
  }

  return new Promise((resolve, reject) => {
    const iteration = { value: 1, n };

    (function iterate(iteration) {
      _factorial(iteration)
        .then((iteration) => {
          if (iteration.n === 0) { resolve(iteration.value); }
          else iterate(iteration);
        });
    })(iteration);
  });
}

factorial(6).then((v) => console.log(v));
console.log('done');
