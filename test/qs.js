const qs = require('querystring');
const {URLSearchParams} = require('url');

const obj = {
  foo: 'bar',
  baz: ['qux', 'quux'],
  corge: ''
};

console.log(qs.stringify(obj));

const obj1 = {
  w: '中文',
  foo: 'bar'
};

console.log(qs.stringify(obj1));
console.log(qs.parse(qs.stringify(obj1)));

console.log(new URLSearchParams(obj1).toString());