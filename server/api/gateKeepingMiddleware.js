const {models: {User}} = require('../db')

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    req.user = user
    next()
  } catch (e) {
    next(e)
  }
}

const isAdmin = (req, res, next) => {
  if(!req.user.isAdmin) {
    return res.status(403).send('Thou shalt not pass')
    // if user is admin, pass them forward
  } else {
    next()
  }
}

module.exports = {
  requireToken,
  isAdmin
}
