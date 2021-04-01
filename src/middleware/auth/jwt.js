const { sign } = require('jsonwebtoken');
const { jwt } = require('../../config');

class Options {
  // do not pass these vals into payload, only pass these into options argument
  // for understanding on what these items are go to https://www.npmjs.com/package/jsonwebtoken
  constructor() {
    this.algorithm = null;
    this.expiresIn = null;
    this.audience = null;
    this.notBefore = null;
    this.issuer = null;
    this.jwtid = null;
    this.subject = null;
    this.noTimestamp = null;
    this.header = null;
    this.options = null;
  }
  // create options object and make expiration optional
  createOptions(options) {
    if (Object.keys(options).length === 0) {
      return null;
    }

    const optionsObj = {};

    if (options.expiresIn === undefined) {
      optionsObj.expiresIn = jwt.exp;
    } else if (options.expiresIn === null) {
      delete options.expiresIn;
    }

    this.options = { ...options, ...optionsObj };
    return this.options;
  }
}

// give secret
class Secret {
  constructor() {
    this.secret = jwt.secret;
  }
}

class JWT {
  constructor() {
    this.token = null;
    this.payload = null;
    this.secret = null;
    this.options = null;
  }
  // create jwt
  createToken(payload, options) {
    if (!payload || !options) {
      return null;
    }
    this.payload = payload;
    this.secret = new Secret().secret;
    this.options = new Options().createOptions(options);

    if (!this.options) {
      return null;
    }
    this.token = sign(this.payload, this.secret, this.options);
    return this.token;
  }
}

module.exports = JWT;
