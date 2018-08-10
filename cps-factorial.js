function _factorial(n, cb, res=1) {
  if (n === 1) { return cb(res) };
  setTimeout(() => {
    _factorial(n - 1, cb, res * n);
  }, 0);
}

_factorial(5, console.log);
console.log('done');
