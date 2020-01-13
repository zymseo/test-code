; (function () {

  function co(gen) {
    const g = gen();
    next();
    function next(value) {
      const res = g.next(value);
      if (res.done) {
        return res.value;
      }
      if (typeof res.value.then === 'function' && res) {
        res.value.then(data => {
          next(data);
        });
      }
    }
  }

  function* fn() {
    const a = yield p1();
    const b = yield p2();
    console.log(a + b);
  }

  function p1() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    });
  }

  function p2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(2);
      }, 1000);
    });
  }

  co(fn);

})();