/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof __webpack_require__.g !== 'undefined') {
    local = __webpack_require__.g;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map


/***/ }),

/***/ "./node_modules/nodelist-foreach-polyfill/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/nodelist-foreach-polyfill/index.js ***!
  \*********************************************************/
/***/ (function() {

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


/***/ }),

/***/ "./src/js/modules/calculator.js":
/*!**************************************!*\
  !*** ./src/js/modules/calculator.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ calculator; }
/* harmony export */ });
// CALCULATOR-----------------------------------------------------
function calculator() {
  const result = document.querySelector('.calculating__result span'); // получили по селектору класс, в который будем записывать результат расчета
  let sex,
    height,
    weight,
    age,
    ratio = 1.375; // объявили несколко переменных (через let так как они будут меняться): пол, рост, вес, возраст и коэффициент активности
  if (localStorage.getItem('sex')) {
    // назначим проверку при получении значений элементов из localStorage
    sex = localStorage.getItem('sex'); // присваиваем значение переменной sex из localStorage
  } else {
    sex = 'female'; // если нет значения элементов sex из localStorage, то вводим их вручную
    localStorage.setItem('sex', 'female'); // присваиваем в localStorage опционально значение полу
  }
  if (localStorage.getItem('ratio')) {
    // назначим проверку при получении значений элементов из localStorage
    ratio = localStorage.getItem('ratio'); // присваиваем значение переменной ratio из localStorage
  } else {
    ratio = 1.375; // если нет значения элементов ratio из localStorage, то вводим их вручную
    localStorage.setItem('ratio', 1.375); // присваиваем в localStorage опционально значение активности
  }
  function initLocalSettings(selector, activeClass) {
    // перебираем все элементы в sex и ratio, при совпадении с ключами в localStorage с sex: female и ratio: 1.375, назначаем класс активности
    const elements = document.querySelectorAll(selector); // присваиваем селектор переменной elements
    elements.forEach(elem => {
      // начинаемперебирать все элементы в sex и ratio
      elem.classList.remove(activeClass); // удаляем сразу все классы активности заранее
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        // перебираем по id соответствия в localStorage с sex: female с назначением класса активности
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        // перебираем по id соответствия в localStorage с ratio: 1.375 с назначением класса активности
        elem.classList.add(activeClass);
      }
    });
  } // при этом данная функция должна вызываться один раз при занесенных пользователем данных!!!!
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  function calcTotal() {
    // подсчитываем конечный результат, но начинать подсчет будем с проверки наличия всех заполненных данных, запускаться будет при внесении изменений
    if (!sex || !height || !weight || !age || !ratio) {
      // строка (+'fbgdfj') при преобразовании в числовой формат дает NaN, а NaN == false; при проверке значения: true, т.е. на наличие =>
      result.textContent = ''; // => всех заполненых переменных, они преобразуются в конструкции switch к числу (+input.value;); но если хотя бы одно значение будет NaN == false, то =>
      return; // => прерываем досрочно функцию с сообщением '...' и все условия после return работать не будут!!!
    }
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio); // метод Math.round() - округляет до целого числа 
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio); // метод Math.round() - округляет до целого числа 
    }
  }
  calcTotal();
  function getStaticInformation(selector, activeClass) {
    // применять функцию будем на двух аргументах: на селекторе и классе активности, для получения информации со статических блоков
    const elements = document.querySelectorAll(selector); // получим элементы (все div) внутри блоков #gender и .calculating__choose_big
    elements.forEach(elem => {
      elem.addEventListener('click', e => {
        // отслеживаем все клики по родительскому элементу, который содержит все div (делегирование событий) при помощи коллбэк функции
        if (e.target.getAttribute('data-ratio')) {
          // если это блок - ratio (т.е. содержит атрибут data-ratio), то получаем значения по data-ratio атрибуту, 
          ratio = +e.target.getAttribute('data-ratio'); // присваиваем переменной ratio числовое значение атрибута data-ratio
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // добавляем в localStorage постоянные данные, выбранные пользователем
        } else {
          sex = e.target.getAttribute('id'); // если блок - gender/sex, то значаения получаем по id
          localStorage.setItem('sex', e.target.getAttribute('id')); // добавляем в localStorage постоянные данные, выбранные пользователем
        }
        console.log(ratio, sex);
        elements.forEach(elem => {
          // меняем классы активности
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
    // function getStaticInformation(parentSelector, activeClass) { // применять функцию будем на двух аргументах: на родительском селекторе и классе активности, для получения информации со статических блоков
    // 	const elements = document.querySelectorAll(`${parentSelector} div`); // получим элементы (все div) внутри родительского блока
    // document.querySelector(parentSelector).addEventListener('click', (e) => { // отслеживаем все клики по родительскому элементу, который содержит все div (делегирование событий) при помощи коллбэк функции
    // 	if (e.target.getAttribute('data-ratio')) { // если это блок - ratio (т.е. содержит атрибут data-ratio), то получаем значения по data-ratio атрибуту, 
    // 		ratio = +e.target.getAttribute('data-ratio'); // присваиваем переменной ratio числовое значение атрибута data-ratio
    // 	} else {
    // 		sex = e.target.getAttribute('id'); // если блок - gender/sex, то значаения получаем по id 
    // 	}
    // 	console.log(ratio, sex);
    // 	elements.forEach(elem => { // меняем классы активности
    // 		elem.classList.remove(activeClass);
    // 	});
    // 	e.target.classList.add(activeClass);
    // 	calcTotal();
    // }); // !!!но делегирование в данном случае создает сложность, когда кликаешь на родительский блок, он подсвечивается, так как ему назначается класс активности!!!
    // }
  }
  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
  function getDynamicInformation(selector) {
    // функция обрабатывает каждый отдельный input
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      // используем switch case конструкцию
      if (input.value.match(/\D/g)) {
        // если мы вводим в input значение value не соответствующее цифрам, то не позволяем выполнять вычисления!!!
        input.style.border = '2px solid red'; // так же задаём красныую обводку блоку input
      } else {
        input.style.border = 'none'; // ПРОВЕРКА НА ОТМЕТКУ/ВВОД ДАННЫХ В ИНПУТ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      }
      switch (input.getAttribute('id')) {
        // проверяем input по уникальному идентификатору
        case 'height':
          // если это рост, то записываем в него значение роста
          height = +input.value;
          break;
        case 'weight':
          // если это вес, то записываем в него значение веса
          weight = +input.value;
          break;
        case 'age':
          // если это возраст, то записываем в него значение возраста
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ cards; }
/* harmony export */ });
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services.js */ "./src/js/services/services.js");


// CLASSES-for-CARDS--------------------------------------------------
function cards() {
  class MenuCards {
    constructor(srcImg, altText, title, descr, price, parentSelector, ...classes) {
      // добавил REST оператор (...classes), так как не известно - будут ли еще изменения в карточках меню
      this.srcImg = srcImg;
      this.altText = altText;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transfer = 100; // курс доллара к рублю
      this.classes = classes; // создаем рест оператор с поименованием его ...classes, будем работать с ним как с массивом, новых классов может быть множество
      this.parentSelector = document.querySelector(parentSelector); // тут теперь лежит DOM element от родителького селектора '.menu .container', который передается в настройку нашего класса!!!	
      this.changeToRub(); // создаем changeToRub() - метод конвертирования цены из долларов в рубли после построения всех свойств объекта
    }
    changeToRub() {
      this.price = +this.price * +this.transfer; // унарный "+" переводит в числовое счисление
    }
    render() {
      // классическое название для формирование верстки - метод render()
      const element = document.createElement('div'); // создаем элемент div, помещаем его в переменную, к которой можно обращаться 
      if (this.classes.length === 0) {
        // если в массив this.classes ничего не передается, ни один элемент и он пуст (rest оператор формирует массивы на каждом шаге из 3), то проходим по всем элементам, по каждому =>
        this.element = 'menu__item'; // и присваиваем дефолтный класс '.menu__item' всем создаваемым element/div элементам поочередно
        element.classList.add(this.element); // далее на каждом шаге из трех (три карточки), добавляется класс '.menu__item' в класс лист (псевдомассив) => element.classList.add('menu__item') - тоже самое в одну строку!!!
      } else {
        // если в массив this.classes хоть один класс передан, то каждому добавляем класс => назовем каждый элемент внутрии массива classes как className, так как стрелочная функция будет принимать этот аргумент className
        this.classes.forEach(className => element.classList.add(className)); // для каждого элемента массива обращаемся к classList созданного в массиве element/div и добавляем каждый класс, который находится в массиве className				
      } // атрибуту "class" соответствует свойство className в JS, т.е. class="menu__item" соответствует className = 'menu__item'
      element.innerHTML = `					
				<img src=${this.srcImg} alt=${this.altText}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб./день</div>
				</div>				
			`; // динамически создаем вложенную структуру каждого элемента div
      this.parentSelector.append(element); // метод append() добавляет на каждом шаге в конец родительского '.menu .container' новый DOM element/div
      this.element = 'new-card'; // на каждом шаге из трех (три карточки), добавляется к каждому новому элементу класс '.new-card'
      element.classList.add(this.element); // на каждом шаге из трех (три карточки), добавился класс '.new-card' в класс лист (псевдомассив)
      const newCards = document.querySelectorAll('.new-card'); // создаем новые элементы newCards с классом '.new-card', для дальнейшего использования
      const prototypeCards = document.querySelectorAll('.prototype-card'); // создаем новые элементы prototypeCards с классом '.prototype-card', для дальнейшего использования
      // console.log(prototypeCards); // NodeList(3) [div.menu__item.prototype-card, div.menu__item.prototype-card, div.menu__item.prototype-card]
      // console.log(newCards); // NodeList(3) [div.menu__item.new-card, div.menu__item.new-card, div.menu__item.new-card]
      prototypeCards[0].replaceWith(newCards[0]); // на каждом шаге из трех (три карточки), каждый вновь созданный элемент с классом '.new-card' замещает заглушечный элемент с классом '.prototype-card'
    }
  }

  // getResources('http://localhost:3000/menu') => еще вариант формирования MenuCards
  // 	.then(data => createMenuCards(data));
  // function createMenuCards(data) {
  // 	data.forEach(({img, altimg, title, descr, price}) => {
  // 		const element = document.createElement('div');
  // 		element.classList.add('menu__item');
  // 		element.innerHTML = `					
  // 			<img src=${img} alt=${altimg}>
  // 			<h3 class="menu__item-subtitle">${title}</h3>
  // 			<div class="menu__item-descr">${descr}</div>
  // 			<div class="menu__item-divider"></div>
  // 			<div class="menu__item-price">
  // 				<div class="menu__item-cost">Цена:</div>
  // 				<div class="menu__item-total"><span>${price}</span> руб./день</div>
  // 			</div>			
  // 		`;
  // 		document.querySelector('.menu .container').append(element);
  // 	});
  // }

  (0,_services_services_js__WEBPACK_IMPORTED_MODULE_0__.getResources)('http://localhost:5000/menu') // оптимизируем работу с карточками МЕНЮ
  .then(data => {
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      // перебираем весь массив db.json состоящий из объектов деструктурировав его методом ({img, altimg, title, descr, price})
      new MenuCards(img, altimg, title, descr, price, '.menu .container').render(); // запускаем конструктор - MenuCards() для заполнения - render() карточек меню столько раз, сколько объектов в массиве db.json
    });
  });

  // new MenuCards( // эта запись позволяет создавать объект без переменой => заменили верстку динамическим формированием MenuCards с помощью запросов к серверу 
  // 	'img/tabs/vegy.jpg',
  // 	'vegy',
  // 	'Меню "Фитнес"',
  // 	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  // 	9,
  // 	'.menu .container',
  // 	'menu__item',  // классы успешно добавляются
  // 	// 'first', // классы успешно добавляются
  // 	// 'first__green', // классы успешно добавляются
  // ).render(); // заполняем новый класс MenuCards с помощью метода render(), карточка создастся, заполнится и метод удалится, так как на него не будет больше ссылок

  // new MenuCards(
  // 	'img/tabs/elite.jpg',
  // 	'elite',
  // 	'Меню "Премиум"',
  // 	'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  // 	21,
  // 	'.menu .container',
  // 	'menu__item',  // классы успешно добавляются
  // 	// 'second', // классы успешно добавляются
  // 	// 'second__blue', // классы успешно добавляются
  // ).render(); // заполняем новый класс MenuCards с помощью метода render(), карточка создастся, заполнится и метод удалится, так как на него не будет больше ссылок

  // new MenuCards(
  // 	'img/tabs/post.jpg',
  // 	'post',
  // 	'Меню "Постное"',
  // 	'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  // 	14,
  // 	'.menu .container',
  // 	'menu__item',  // классы успешно добавляются
  // 	// 'third', // классы успешно добавляются
  // 	// 'third__red',  // классы успешно добавляются
  // ).render(); // заполняем новый класс MenuCards с помощью метода render(), карточка создастся, заполнится и метод удалится, так как на него не будет больше ссылок
}

/***/ }),

/***/ "./src/js/modules/carousel.js":
/*!************************************!*\
  !*** ./src/js/modules/carousel.js ***!
  \************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ carousel; }
/* harmony export */ });
/* eslint-disable linebreak-style */
function carousel({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field
}) {
  // принцип деструктуризации, создаем объект аргументов
  // SLIDER----------------------ПРОСТОЙ ВАРИАНТ--------------------
  // const slides = document.querySelectorAll('.offer__slide'); // получаем все слайды на странице
  // const prev = document.querySelector('.offer__slider-prev'); // получаем стрелки перелистывания слайдов
  // const next = document.querySelector('.offer__slider-next'); // получаем стрелки перелистывания слайдов
  // const totalSlides = document.querySelector('#total'); // получаем значение элементов по идентификатору
  // const currentSlide = document.querySelector('#current'); // получаем значение элемента по идентификатору
  // let slideIndex = 1; // назначаем индекс каждому слайду
  // showSlides(slideIndex); // инициализируем функцию showSlides() со значением "1"
  // if (slides.length < 10) { // если количество слайдов меньше
  // 	totalSlides.textContent = `0${slides.length}`; // то добавляем к порядковому значению слайда "0"
  // } else { // иначе
  // 	totalSlides.textContent = slides.length; // просто записываем порядковое значение слайда
  // }
  // function showSlides(n)  { // присваиваем порядковый номер каждому слайду "n"
  // 	if (n > slides.length) {// если количество слайдов slides.length меньше порядкового номера слайда "n"
  // 		slideIndex = 1; // если ушли в "правую границу" слайдов, то перемещаемся в самое "начало" => slideIndex = 1
  // 	}
  // 	if (n < 1) {// если порядковый номер слайда "n" меньше 1
  // 		slideIndex = slides.length; // если ушли в "левую границу" слайдов, то перемещаемся в самый "конец" => slideIndex = slides.length
  // 	}
  // 	slides.forEach(item => item.style.display = 'none'); // сначала скрываем все слайды на страничке
  // 	slides[slideIndex - 1].style.display = 'block' ; // потом по нажатию показываем нужный слайд, выбираем [slideIndex - 1] так как массив начинается с "0"
  // 	if (slides.length < 10) { // если количество слайдов меньше
  // 		currentSlide.textContent = `0${slideIndex}`; // то добавляем к порядковому значению слайда "0"
  // 	} else { // иначе
  // 		currentSlide.textContent = slideIndex; // просто записываем порядковое значение слайда
  // 	}
  // }
  // function plusSlide(n) { // перебираем слайды по нажатию на стрелочки
  // 	showSlides(slideIndex += n); // если n=1, то прибавляем, если n=-1, то отнимаем 
  // }
  // prev.addEventListener('click', () => { // при нажатии на стрелочку "влево", передаем в функцию plusSlide() минус один
  // 	plusSlide(-1);
  // });
  // next.addEventListener('click', () => { // при нажатии на стрелочку "вправо", передаем в функцию plusSlide() плюс один
  // 	plusSlide(1);
  // });

  // CAROUSEL-------------------------------------БОЛЕЕ СЛОЖНЫЙ ВАРИАНТ------------
  const slides = document.querySelectorAll(slide); // получаем все слайды на странице (length: 4)
  const slider = document.querySelector(container); // получаем весь блок слайдера
  const prev = document.querySelector(prevArrow); // получаем стрелки перелистывания слайдов
  const next = document.querySelector(nextArrow); // получаем стрелки перелистывания слайдов
  const totalSlides = document.querySelector(totalCounter); // получаем общее значение элементов по идентификатору
  const currentSlide = document.querySelector(currentCounter); // получаем текущее значение элемента по идентификатору
  const slidesWrapper = document.querySelector(wrapper); // получаем блок-обертку слайдеров
  const sliderInner = document.querySelector(field); // получаем дополнительно созданный блок, объединяющий в линию все слайды
  const sliderWidth = window.getComputedStyle(slidesWrapper).width; // получаем значение ширины слайдера из блока-обёртки слайдов (применим для расчета ширины одного слайда) = 650px
  let slideIndex = 1; // назначаем индекс каждому слайду	
  let slideOffset = 0; // назначим отступ как ориентир сдвига слайдов
  if (slides.length < 10) {
    // если количество слайдов меньше
    totalSlides.textContent = `0${slides.length}`; // то добавляем к порядковому значению слайда "0"
    currentSlide.textContent = `0${slideIndex}`;
  } else {
    // иначе
    totalSlides.textContent = slides.length; // просто записываем порядковое значение слайда
    currentSlide.textContent = slideIndex;
  }
  sliderInner.style.width = 100 * slides.length + '%'; // 100% значение ширины блока offer__slide умножаем на количество слайдов slides.length (это запись css стилей), чтобы слайды помещались в блок offer__slider-inner (получаем 400%)
  sliderInner.style.display = 'flex'; // присваиваем CSS свойства блоку offer__slider-inner для того, чтобы слайды выстроились в строку
  sliderInner.style.transition = '0.5s all'; // присваиваем CSS свойства блоку offer__slider-inner для того, чтобы слайды перемещались плавно
  slidesWrapper.style.overflow = 'hidden'; // ограничим отображение сверх блока offer__slider-wrapper
  slides.forEach(slide => {
    // ограничим ширину всех слайдов, обратившись к каждому слайду на странице, установив определенную ширину
    slide.style.width = sliderWidth; // получаем значение 650px
  });
  slider.style.position = 'relative'; // присваиваем значение всему блоку offer__slider
  const dots = document.createElement('ol'); // создаем переменную dots для навигации по слайдеру в блоке ol нумерованного списка
  const dotsArr = []; // создаем массив для навигации по слайдеру (length: 4) [li, li, li, li]
  dots.classList.add('carousel-dots'); // добавляем в блок ol нумерованного списка класс carousel-dots и CSS стили
  dots.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
  slider.append(dots); // добавляем в слайдер блок ol нумерованного списка
  for (let i = 0; i < slides.length; i++) {
    // добавляем итератор +1 для всего количества слайдов
    const dot = document.createElement('li'); // каждому li - элементу нумерованного списка назначаем =>
    dot.setAttribute('data-slide-to', i + 1); // дата атрибут, т.е. нумерацию (массив начинается с нуля + 1, значит пойдет с единицы) и CSS стили
    dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;
    if (i == 0) {
      // если первая итерация =>
      dot.style.opacity = 1; // то к первому dot добавляем класс активности (opacity) непрозрачность
    }
    dots.append(dot); // добавляем в слайдер и в блок ol нумерованного списка, навигационные кнопки нумерованного списка
    dotsArr.push(dot); // связываем массив с точками(элементами) нумерованного списка в слайдере (push - добавлять в массив)
  }
  function deleteNotDigits(str) {
    // оптимизируем код одной функцией
    return +str.replace(/\D/g, ''); // замещаем в строке (+str) с числовым типом данных все нецифры (\D) с глобальным флагом (g) на пустое место сроки, т.е. 650px => 650
  }
  function changeIndexСondition() {
    // оптимизируем код одной функцией с условием
    if (slides.length < 10) {
      currentSlide.textContent = `0${slideIndex}`;
    } else {
      currentSlide.textContent = slideIndex;
    }
  }
  function changeDotСondition() {
    // оптимизируем код одной функцией
    dotsArr.forEach(dot => dot.style.opacity = '.5');
    dotsArr[slideIndex - 1].style.opacity = 1;
  }
  prev.addEventListener('click', () => {
    // при нажатии на стрелочку "влево",  смещаем слайд вправо на плюсовое значение slideOffset
    if (slideOffset == 0) {
      // после сравнения и выяснения, что у нас возвращен первый слайд, перемещаемся в самый конец
      slideOffset = deleteNotDigits(sliderWidth) * (slides.length - 1); // т.е. долистываем до самого начала блока слайдов и переключаемся на последний слайд - отступ равен ширине одного слайда (из строки '650px' с длинной символов 5 - вырезаем последние два) умноженного на (число слайдов минус один) = 1950
      sliderInner.style.transition = '0.25s all';
    } else {
      slideOffset -= deleteNotDigits(sliderWidth); // по нажатию срелочки "влево", к -slideOffset добавляется ширина еще одного слайда и слайд смещается на определенную величину
      sliderInner.style.transition = '0.5s all';
    }
    sliderInner.style.transform = `translateX(-${slideOffset}px)`; // сдвигаем слайд с помощью transform: translateX(), так как значение плюсовое - сдвиг вправо 
    if (slideIndex == 1) {
      // если текущий slideIndex равен 1 
      slideIndex = slides.length; // присваиваем значение slideIndex количество слайдов
    } else {
      slideIndex--; // иначе уменьшаем на единицу
    }
    changeIndexСondition();
    changeDotСondition();
  });
  next.addEventListener('click', () => {
    // при нажатии на стрелочку "вправо", смещаем слайд влево на минусовое значение slideOffset 
    if (slideOffset == deleteNotDigits(sliderWidth) * (slides.length - 1)) {
      // отступ равен ширине одного слайда (из строки '650px' с длинной символов 5 - вырезаем последние два) умноженного на (число слайдов минус один)
      sliderInner.style.transition = '0.25s all';
      slideOffset = 0; // т.е. долистываем до самого конца блока слайдов и переключаемся на первый слайд
    } else {
      sliderInner.style.transition = '0.5s all';
      slideOffset += deleteNotDigits(sliderWidth); // когда мы нажимаем срелочку "вправо", к +slideOffset добавляется ширина еще одного слайда и слайд смещается на определенную величину
    }
    sliderInner.style.transform = `translateX(-${slideOffset}px)`; // сдвигаем слайд с помощью transform: translateX(), так как значение минусовое - сдвиг влево 
    if (slideIndex == slides.length) {
      // если текущий slideIndex равен количеству слайдов
      slideIndex = 1; // присваиваем значение slideIndex единицу
    } else {
      slideIndex++; // иначе увеличиваем на единицу
    }
    changeIndexСondition();
    changeDotСondition();
  });
  dotsArr.forEach(dot => {
    dot.addEventListener('click', e => {
      // назначаем каждой из точек событие
      const slideTo = e.target.getAttribute('data-slide-to'); // присваиваем переменной slideTo новый атрибут data-slide-to
      slideIndex = slideTo; // присваиваем переменной slideIndex значение slideTo
      slideOffset = deleteNotDigits(sliderWidth) * (slideTo - 1);
      sliderInner.style.transform = `translateX(-${slideOffset}px)`;
      changeIndexСondition();
      changeDotСondition();
    });
  });
}

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ forms; }
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services.js */ "./src/js/services/services.js");



// SEND-FORMS---------fetch() НОВЫЙ ТИП ЗАПРОСОВ гораздо ПРОЩЕ и КОРОЧЕ 
function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    // loading: 'Загрузка...', // текст комментируем, так как будем использовать спиннер картинку
    loading: 'img/form/spinner.svg',
    // добавляем картинку спиннера вместо надписи в блоке div Загрузка...
    success: 'Спасибо! Скоро с Вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(item => {
    // берем все созданные формы и подвязываем функцию bindpostData
    bindPostData(item);
  });
  function bindPostData(form) {
    // будем (bind) привязывать какую-то форму, очень удобно навесить на нее обработчик события submit, которое будет срабатывать каждый раз при отправке форм
    form.addEventListener('submit', e => {
      e.preventDefault(); // отменяем дефолтную перезагрузку и поведение браузера
      // const statusMessage = document.createElement('div'); // создаем блок для сообщений
      const statusMessage = document.createElement('img'); // вместо блока теперь будем использовать картинку спиннера
      // statusMessage.classList.add('status'); // добавляем класс блоку сообщений
      statusMessage.src = message.loading; // используем путь к спиннеру
      statusMessage.textContent = message.loading; // заполняем блок главным сообщением 'Загрузка...'
      statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`; // добавляем стили спиннеру
      // form.append(statusMessage); // к форме добавляем это сообщение 'Загрузка...'
      form.insertAdjacentElement('afterend', statusMessage); // чтобы спиннер не сбивал верстку используем insertAdjacentElement() - вставить соседний элемент ()!!!
      const formData = new FormData(form); // FormData(form) отыскивает в html атрибут name в тегах input всех форм, без него работать не будет!!!
      // const objectJson = {}; // создал новый объект для отправки данных в формате json
      // formData.forEach(function(value, key) { // forEach переберет все, что есть внутри formData и заполнит objectJson
      // 	objectJson[key] = value;
      // });
      // postData('http://localhost:3000/requests', JSON.stringify(objectJson)) // конвертируем json в строку JSON с двойными ковычками =>
      // это упрощеная форма создания объекта objectJson, есть более элегантый способ  с помощью методов Json => берем formData и превращаем ее в массив массивов с помощью formData.entries(), 
      const json = JSON.stringify(Object.fromEntries(formData.entries())); // далее в классический объект Object.fromEntries(formData.entries(), а затем, переводим в формат JSON данные запроса через JSON.stringify(Object.fromEntries(formData.entries()))			
      (0,_services_services_js__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:5000/requests', json)
      // .then(data => data.text()) // данная строка уже не нужна, она создается в postData асинхронной функции и уже там прописана внутри
      .then(data => {
        // сервер вернет данные data, пока это не JSON
        console.log(data); // берем data данные, которые вернул сервер из PROMISE (успешный исход)
        showThanksModal(message.success); // вместо statusMessage.textContent будет показываться модальное окно функции showThanksModal()!!!
        statusMessage.remove(); // удаляем наш спинер по выполнению PROMISE
      }).catch(() => {
        // catch метод обязательно нужно прописывать для обратоток ошибок!!!
        showThanksModal(message.failure); // вместо statusMessage.textContent будет показываться модальное окно функции showThanksModal()!!!				
      }).finally(() => {
        // finally метод обязательно нужно прописывать для обратоток оконечных действий
        form.reset(); // очищаем форму после выведением сообщения				
      });
    });
  }
  function showThanksModal(message) {
    // создаем функцию динамической замены элементов мадального окна с отправкой сообщения message
    const prevModalDialog = document.querySelector('.modal__dialog'); // получаем элемент modal__dialog
    prevModalDialog.classList.add('hide'); // добавляем класс hide элементу modal__dialog
    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModalWindow)('.modal', modalTimerId); // команда открытия модальных окон
    const thanksModal = document.createElement('div'); // создаем новый контент обертку
    thanksModal.classList.add('modal__dialog'); // будем заменять один modal__dialog другим с новым контентом
    thanksModal.innerHTML = ` 
			<div class="modal__content">
				<div class="modal__close" data-close>&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`; // создаем новый контент и в первоначальном скрипте (MODAL----) настраиваем ДЕЛЕГИРОВАНИЕ СОБЫТИЙ!!!
    document.querySelector('.modal').append(thanksModal); // помещаем новое модальное окно на страницу
    setTimeout(() => {
      // чтобы новый динамический блок исчезал через 4 сек. и появлялся предыдущий сверстанный блок modal__dialog, применим асинхронную операцию setTimeout()
      thanksModal.remove(); // thanksModal будем удалять, чтобы вновь созданные блоки не накапливались
      prevModalDialog.classList.add('show'); // заменяем классы отображения сверстанного модального окна modal__dialog
      prevModalDialog.classList.remove('hide');
      (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModalWindow)('.modal'); // закрываем модальное окно, чтобы не мешать пользователю
    }, 4000);
  }
}

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModalWindow: function() { return /* binding */ closeModalWindow; },
/* harmony export */   openModalWindow: function() { return /* binding */ openModalWindow; }
/* harmony export */ });
// MODAL----------------------------------------------------------
function openModalWindow(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.add('show');
  modalWindow.classList.remove('hide');
  document.body.style.overflow = 'hidden'; // при открытии модального окна, скрываем скролл страницы
  // console.log(modalTimerId);
  if (modalTimerId) {
    // если modalTimerId был передан, то только тогда будет запускаться clearInterval()
    clearInterval(modalTimerId); // если пользователь сам закрыл модальное окно, сбрасываем интервал его автооткрытия
  }
}
function closeModalWindow(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.add('hide');
  modalWindow.classList.remove('show');
  document.body.style.overflow = ''; // только при закрытии модального окна, включается скролл страницы
}
function modal(triggerSelector, modalSelector, modalTimerId) {
  // => modal('[data-modal]', '.modal', modalTimerId); добавим два аргумента triggerSelector, modalSelector для инкапсуляции 
  const modalTrigger = document.querySelectorAll(triggerSelector); // '[data-modal]'
  const modalWindow = document.querySelector(modalSelector); // '.modal'
  // const modalCloseBtn = document.querySelector('[data-close]'); // для ДЕЛЕГИРОВАНИЯ СОБЫТИЙ убираем данную переменную
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModalWindow(modalSelector, modalTimerId)); // переданная в обработчик события коллбэк функция openModalWindow(modalSelector)) не дожна сразу вызываться, а просто объявляться, () => стрелочная функция оборачивает коллбэк и вызывает его по клику
  });
  // modalCloseBtn.addEventListener('click', closeModalWindow); // для ДЕЛЕГИРОВАНИЯ СОБЫТИЙ убираем данную часть
  modalWindow.addEventListener('click', e => {
    if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
      // если куда кликнул пользователь (целевое событие) совпадает с модальным окном, то модальное окно закрывается
      closeModalWindow(modalSelector); // для ДЕЛЕГИРОВАНИЯ СОБЫТИЙ добавляем условие  || e.target.getAttribute('data-close') == '' т.е. когда в елементе есть data-close со значением пустой строки, кликаем на подложку или крестик - окно закрывается		
    }
  });
  document.addEventListener('keydown', e => {
    // событие по нажатию клавиши 
    if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
      // метод code === 'Escape' отслеживает keydown - событие по нажатию клавишы ESC, что закрывает модальное окно
      closeModalWindow(modalSelector); // также modalWindow.classList.contains('show')) проверяет наличие открытого модального окна, чтобы отработала функция closeModalWindow()
    }
  });
  function showModalWindowByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      // отслеживаем сколько пикселей по оси Y отлистал пользователь + высота видимой части сравниваются с высотой/прокруткой всего контента минус один пиксель
      openModalWindow(modalSelector, modalTimerId); // если они совпадают, то пользователь долистал до конца контена => открывается модальное окно, но при каждом долистовании!!!
      window.removeEventListener('scroll', showModalWindowByScroll); // как только пользователь долистал до конца, модальное окно выйдет только ОДИН РАЗ!!! УДАЛЯЕМ ОБРАБОТЧИК за счет removeEventListener()!!!
    } // нужно избежать подобных повторов, но =>
  } // }, {once: true}); в данном случае не подходит, так как единоразовая прокрутка на 1px вызывает это условие!!!
  window.addEventListener('scroll', showModalWindowByScroll); // отслеживаем событие scroll во всем окне браузера
}
/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ tabs; }
/* harmony export */ });
// TABS-----------------------------------------------------------
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector); // '.tabheader__item'
  const tabsContent = document.querySelectorAll(tabsContentSelector); // '.tabcontent'
  const tabsParent = document.querySelector(tabsParentSelector); // '.tabheader__items'
  function hideTabContent() {
    // функция скрывает часть табов
    tabsContent.forEach(item => {
      // перебираем каждый элемент псевдомассива методом forEach()
      // item.style.display = 'none';
      item.classList.add('hide');
      item.classList.remove('show', 'fade'); // toggle() не подходит, так как это наведет кашу в классах, можно добавить список классов
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass); // 'tabheader__item_active' - точку не ставим, так как уже метод classList() на это указывает
    });
  }
  function showTabContent(i = 0) {
    // ES6 позволяет по умолчанию задать значение аргумента в "0"!!!
    // tabsContent[i].style.display = 'block';
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass); // 'tabheader__item_active' - точку не ставим, так как уже метод classList() на это указывает
  }
  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    // применим делегирование событий для tabsParent или '.tabheader__items' по клику
    const target = event.target; // ЧАСТОЕ ИСПОЛЬЗОВАНИЕ event.target УДОБНО ПЕРЕОПРЕДЕЛИТЬ В ПЕРЕМЕННУЮ!!!
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      // проверяем на ниличие целевого события и что точно кликнули в tabs, а не в родителя; убираем точку у селектора '.tabheader__item'
      tabs.forEach((item, i) => {
        // перебираем каждый элемент псевдомассива методом forEach(), т.е. каждый элемент/таб - item с номером i по порядку в псевдомассиве tabs
        if (target == item) {
          // если целевое событие соответствует этому элементу по клику, т.е. если элемент/таб псевдомассива совпадает с элементом/табом, в который кликнул пользователь:
          hideTabContent(); // => тогда все лишние элементы скрываем со страницы
          showTabContent(i); // => тогда берем его номер и показываем на странице
        } // если кликнули в 3-й таб, то метод forEach() перебирает все табы, когда доходит до третьего, первые два и последний четвертый скрыты, а третьему назначаются классы 'show', 'fade'
      });
    }
  });
}

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ timer; }
/* harmony export */ });
// TAIMER-(обратного отсчета)-------------------------------------
function timer(id, deadLine) {
  // timer('.timer', '2024-03-25T11:57:00.000+03:00');

  // const deadLine = '2023-12-31'; // переводим в миллисекунды строку, создав новую переменную в виде строки... setClock('.timer', deadLine);
  function getTimeRemaining(endTime) {
    // функция оставшегося времени 
    let days, hours, minutes, seconds;
    const t = Date.parse(endTime) - Date.parse(new Date()); // определяем разницу между deadLine (endTime) и текущим временем (new Date()) в миллисекундах
    // console.log(Date.parse(new Date())); // получил: 1711099417000 миллисекунд, метод Date.parse() - переводит строку в миллисекунды
    // console.log(new Date()); // Fri Mar 22 2024 12:21:51 GMT+0300 (Москва, стандартное время)
    if (t <= 0) {
      // если t меньше нуля, не выполняем расчетов и назначаем нуль кадому элементу
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)); // определяем оставшееся количество дней, Math.floor() - округление до ближайшего целого (миллисек * сек * мин * час в сутках)!
      hours = Math.floor(t / (1000 * 60 * 60) % 24); // определяем оставшееся количество часов, % - остаток от деления, например 50 / 24 = 2 дня и 2 часа, возвращаем 2 часа!
      minutes = Math.floor(t / 1000 / 60 % 60); //  определяем оставшееся количество минут
      seconds = Math.floor(t / 1000 % 60); //  определяем оставшееся количество секунд
    }
    return {
      // останавливает выполнение функции getTimeRemaining() и возвращает наружу данные расчета в виде объекта!!!
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  function getZero(num) {
    // функция подставления 0 до двузначного числа и вывода информации 0 при остановке таймера!!!
    if (num >= 0 && num < 10) {
      return `0${num}`; // возвращаем измененное значение в виде строки с нулем вначале - при выводе однозначного числа
    } else if (num < 0) {
      return '00'; // при отрицательном значении -  возвращаем нуль, во избежание мигания
    } else {
      return num; // в остальных случаях выводим двузначное число
    }
  }
  function setClock(selector, endTime) {
    // функция установки таймера на страничку
    const timer = document.querySelector(selector); // это div.timer так как setClock(id, deadLine) === timer('.timer', '2024-03-25T11:57:00.000+03:00')
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000); // функция timeInterval() будет обновлять каждые 1000 миллисекунд таймер === функция updateClock(), с помощью метода setInterval()
    updateClock(); // функция запускается один раз первоначально, для избежания мигания таймера, потом устанавливается setInterval в 1000 миллисекунд
    function updateClock() {
      // расчет времени на данную секунду, разница между планируемым временем и текущим
      const t = getTimeRemaining(endTime); // расчет времени запишется на страницу, применим полученные данные из возвращенного объекта функции getTimeRemaining()
      days.innerHTML = getZero(t.days); // заполняем данными страницу HTML
      hours.innerHTML = getZero(t.hours); // заполняем данными страницу HTML
      minutes.innerHTML = getZero(t.minutes); // заполняем данными страницу HTML
      seconds.innerHTML = getZero(t.seconds); // заполняем данными страницу HTML
      if (t.total <= 0) {
        clearInterval(timeInterval); // останавливаем таймер как только время выйдет, когда (new Date()) будет больше (endTime), т.е. уйдет в минус
      }
    }
  }
  setClock(id, deadLine);
  function showEndTime(endTime) {
    const time = new Date(endTime);
    const endDate = document.querySelector('.promotion__end-date');
    const yearBlock = endDate.querySelector('#year');
    const monthBlock = endDate.querySelector('#month');
    const dayBlock = endDate.querySelector('#day');
    const hourBlock = endDate.querySelector('#hour');
    const minBlock = endDate.querySelector('#min');
    yearBlock.innerHTML = getZero(time.getFullYear());
    monthBlock.innerHTML = getZero(time.getMonth() + 1);
    dayBlock.innerHTML = getZero(time.getDate());
    hourBlock.innerHTML = getZero(time.getHours());
    minBlock.innerHTML = getZero(time.getMinutes());
  }
  showEndTime(deadLine); // 2024-03-25T00:00:00.000+03:00
}

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResources: function() { return /* binding */ getResources; },
/* harmony export */   postData: function() { return /* binding */ postData; }
/* harmony export */ });
const postData = async (url, data) => {
  // function expression -  без объявления присваивается в переменную, postData отвечает за постинг данных при отправке на сервер + async в связи с асинхронностью выполнения
  const result = await fetch(url, {
    // в fetch(), url - указываем первым аргументом адрес сервера, data - данные, которые будут поститься - т.е. отправляем сформированный запрос + await для ожидания ответа от сервера
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data // создаем новый объект для формирования документа запроса fetch(), метод и заголовки указывать обязательно!!!	
  }); // фетч запрос вернет промис, в переменной result нет ничего, пока промис не вернет от сервера данные
  return await result.json(); // возвращаем из функции postData промис (result.json()) для дальнейшей обработки через чепочку .then() - но это АСИНХРОННЫЙ КОД + await дожидается обработки данных в result.json()!!!
};
const getResources = async url => {
  // function expression - без объявления присваивается в переменную, getResources отвечает за получение данных с сервера + async в связи с асинхронностью выполнения
  const result = await fetch(url); // фетч запрос вернет промис, в переменной result нет ничего, пока промис не вернет от сервера данные, но fetch сигналы 404, 403, 401 не распознает как ОШИБКИ!!! 
  // ошибками для него являются отсутствие Интернета или критические неполадки в запросе!!! Поэтому создаем условие на сравнение:
  if (!result.ok) {
    // если с result что-то не то.... то
    throw new Error(`Could not fetch ${url}, status: ${result.status}`); // то выбрасываем новыю ошибку
  }
  return await result.json(); // возвращаем из функции postData промис (result.json()) для дальнейшей обработки через чепочку .then() - но это АСИНХРОННЫЙ КОД + await дожидается обработки данных в result.json()!!!
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js");
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nodelist-foreach-polyfill */ "./node_modules/nodelist-foreach-polyfill/index.js");
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/tabs.js */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_cards_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards.js */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/timer.js */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/modal.js */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_forms_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms.js */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_carousel_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/carousel.js */ "./src/js/modules/carousel.js");
/* harmony import */ var _modules_calculator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/calculator.js */ "./src/js/modules/calculator.js");
 // добавил полифилы из node_modules после установки в package.json
 // добавил полифилы из node_modules после установки в package.json









window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_5__.openModalWindow)('.modal', modalTimerId), 60000); // функция автооткрытия модального окна

  // TABS-----------------------------------------------------------
  (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_2__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active'); // передаем в вызов функции tabs() соответствующие аргументы из модуля: =>
  // tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass)

  // TAIMER-(обратного отсчета)-------------------------------------
  (0,_modules_timer_js__WEBPACK_IMPORTED_MODULE_4__["default"])('.timer', '2024-12-31T24:00:00.000+03:00'); // где YYYY-MM-DDTHH:mm:ss.sss GMT+3, Т - разделитель TIME!!!
  // timer(id, deadLine)

  // MODAL----------------------------------------------------------	
  (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_5__["default"])('[data-modal]', '.modal', modalTimerId);
  // modal(triggerSelector, modalSelector, modalTimerId)

  // CLASSES-for-CARDS----------------------------------------------
  (0,_modules_cards_js__WEBPACK_IMPORTED_MODULE_3__["default"])();

  // SEND-FORMS----fetch() НОВЫЙ ТИП ЗАПРОСОВ гораздо ПРОЩЕ и КОРОЧЕ
  (0,_modules_forms_js__WEBPACK_IMPORTED_MODULE_6__["default"])('form', modalTimerId);

  // SLIDER----------------------ПРОСТОЙ ВАРИАНТ--------------------
  (0,_modules_carousel_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
    // принцип деструктуризации, создаем объект аргументов
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });

  // CALCULATOR-----------------------------------------------------
  (0,_modules_calculator_js__WEBPACK_IMPORTED_MODULE_8__["default"])();
});
}();
/******/ })()
;
//# sourceMappingURL=script.bundle.js.map