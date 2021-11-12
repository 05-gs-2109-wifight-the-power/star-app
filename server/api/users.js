const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

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

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
