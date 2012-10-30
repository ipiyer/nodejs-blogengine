var crypto = require('crypto');

module.exports = {
    getHex : function(salt, password){
	var sha = crypto.createHash('sha1');
	sha.update(salt + password, 'utf8', 'utf8');
	return sha.digest('hex');
    },
    genHash : function(password){
	var salt = this.getHex(crypto.randomBytes(20).toString(),
                               crypto.randomBytes(20).toString()).substring(0,19);
	var passHash = this.getHex(salt, password).substring(0,20);
	return salt+ "$" + passHash;
    },
    checkPassword : function(rawPassword, encPassword){
	var split = encPassword.split('$');
	var salt = split[0];
	var hsh = split[1];
	return hsh === this.getHex(salt, rawPassword).substring(0,20);
    }
}
