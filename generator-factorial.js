function *factorial(n) {
  if (typeof n !== 'number' || parseInt(n) !== n || n < 0) {
    throw new Error('Invalued input. Expected an Integer value.');
  }

  let result = 1;
  while (n >= 2) {
    result *= yield n;
    n--;
  }
  return result;
}

function run(fn) {
  const it = fn();
  let iteration = it.next();

  return (function iterate(iteration) {
    if (iteration.done) { return iteration.value; }
    return iterate(it.next(iteration.value));
  })(iteration);
}

const result = run(factorial.bind(null, 5));
console.log(result);
