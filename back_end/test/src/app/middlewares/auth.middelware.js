const User = require('../models/User')
const user = new User()

const privateKey = "k2l"
const jwt = require('jsonwebtoken');

module.exports.requireAuth = function(req, res, next) {
	let accessToken = req.cookies.jwt;

	if (!accessToken) {
		res.status(403).send();
		return;
	}

  try {
		const data = jwt.verify(accessToken, privateKey)
    next()
  } catch(e) {
    console.log(e)
    return res.status(401).send()
  }
}