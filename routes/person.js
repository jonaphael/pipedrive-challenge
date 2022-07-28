const router = require('express').Router()
const { validateBody } = require('../middlewares/person')
const Person = require('../model/Person')

/**
 * @swagger
 *  tags:
 *    name: Person
 *    description: Person (Users in the application)
 */


const { createPerson } = require('../pipedrive/pipedrive_api')

/**
 * @swagger
 * /api/person:
 *   get:
 *     summary: Get all Users/persons who their gist are been monitored!
 *     tags: [Person]
 *     responses:
 *       200:
 *         description: List of users that are been monitored
 *       400:
 *         description: post can not be found
 */
router.get('/', async (req, res) => {
    console.log('reached here')
    const persons = await Person.find({ isDeleted: false });
    return res.send(persons)
})

/**
 * @swagger
 * /api/person/{username}:
 *   get:
 *     summary: Get all Users/persons who their gist are been monitored!
 *     tags: [Person]
 *     parameters:
 *      - in: path
 *        name: username
 *        description: username of the user
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Detail of the user that are been monitored and his gists since last visit
 *       404:
 *         description: User not found in the database
 */
router.get('/:username', async (req, res) => {
    const { username } = req.params
    const person = await Person.findOne({ username, isDeleted: false })
    if (person) return res.send(person)

    return res.status(404).send({ message: `User ${username} not found ` })
})

/**
 * @swagger
 * /api/person/add:
 *   post:
 *     summary: Get all Users/persons who their gist are been monitored!
 *     tags: [Person]
 *     parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          
 *          properties:
 *            username:
 *              type: string
 *              description: github username of the user to monitor hes/her gists
 *     responses:
 *       200:
 *         description: Detail of the user saved
 *       404:
 *         description: User not found in the database
 */
router.post('/add', validateBody, async (req, res) => {
    const { username } = req.body

    const person = await Person.findOne({ username, isDeleted: false })
    if (person) return res.send({ message: `Person ${username} already exist` })

    return createPerson(username)
        .then(async response => {
            const { status, data } = response
            if (status == 201) {
                const { id, name } = data.data
                const dbPerson = new Person({ username: name, ppdvId: id })
                const savedPerson = await dbPerson.save();
                return res.status(status).send(savedPerson)
            }

            return res.status(500).send({ message: 'Internal Error' })
        })
        .catch(err => {
            // console.error(err)
            return res.status(500).send({ error: err })
        });
})

/**
 * Delete a Username or Person to stop monitoring his/her gists
 */
router.delete('/remove/:name', (req, res) => {
    return res.send({})
})

module.exports = router