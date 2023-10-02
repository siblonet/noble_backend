const fs = require('fs-extra');

const dd = './credentials';

const des = './dist/credentials';

fs.copySync(dd, des);

console.log("donnn");