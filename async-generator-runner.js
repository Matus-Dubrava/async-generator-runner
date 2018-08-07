function run(promise) {
  Promise.resolve(promise).then((res) => it.next(res));
}

function foo(val) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(val);
    }, 1000);
  });
}

function *main() {
  const v1 = yield run(foo(1));
  console.log(v1);
  const v2 = yield run(foo(2));
  console.log(v2);
}

const it = main();
it.next();
