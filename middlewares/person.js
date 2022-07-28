const validateBody = (req, res, next) => {
    const { username } = req.body

    if (!username) return res.status(400).send({ message: 'Parameter username is required! '})

    return next()
}

module.exports = { validateBody }