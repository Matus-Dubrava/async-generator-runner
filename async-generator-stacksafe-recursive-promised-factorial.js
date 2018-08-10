function factorial(n) {
  function _factorial(n, res = 1) {
    if (n < 0) { return { value: undefined, done: true }; }
    if (n < 2) { return { value: res, done: true }; }
    return { value: () => _factorial(n - 1, res * n), done: false };
  }

  function *_trampoline(fn, ...args) {
    let res = fn(...args);
    while (!res.done) { res = yield res.value(); }
    return res.value;
  }

  function _run(fn, cb) {
    const it = fn();
    let iteration = it.next();

    return (function iterate(iteration) {
      if (iteration.done) { return cb(null, iteration.value); }
      setTimeout(() => {
        return iterate(it.next(iteration.value));
      }, 0);
    })(iteration);
  }

  function _promisify(fn) {
    return function(...args) {
      return new Promise((resolve, reject) => {
        fn.apply(null, args.concat((err, value) => {
          if (err) { reject(err); }
          resolve(value);
        }));
      });
    }
  }

  const _trampolinedFact = _trampoline.bind(null, _factorial, n);
  const _promisedRun = _promisify(_run);
  return _promisedRun(_trampolinedFact);
}

factorial(7).then((v) => console.log(v));
console.log('done');
