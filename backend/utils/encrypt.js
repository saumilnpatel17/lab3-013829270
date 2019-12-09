'use strict';
var bcrypt = require('bcrypt');
const saltRounds = 10;

const encrypt = {};

encrypt.generateHash = (password) => {
    console.log("Generating hash");
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

encrypt.confirmPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = encrypt;