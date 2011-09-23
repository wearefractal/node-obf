var obf = require('../lib/obfuscate.js');

var newt = obf.obfuscate('$$', 'alert("hello world!")');
console.log(newt);
