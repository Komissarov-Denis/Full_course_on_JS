'use strict';

// console.log(Number.MAX_SAFE_INTEGER);
// VM89:1 9007199254740991

// BigInt - максимально доступное число для корректной работы!!!
// BigInt нельзя использовать с методами со встроенным объектом Math{}!!!
// BigInt нельзя смешивать в операциях с обычными числами!!!

const bigint = 123218645494635168797435132198749n;

const sameBigint = BigInt(123218645494635168797435132198749n);

console.log(typeof(bigint));
console.log(typeof(sameBigint));