const { swaggerUI, specs } = require('../doc/swagger')
const router = require('express').Router()

router.get('/', swaggerUI.setup(specs, { explorer: true }))

module.exports = router