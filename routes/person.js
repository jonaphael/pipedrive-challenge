const router = require('express').Router()
const Person = require('../model/Person')


const { createPerson } = require('../pipedrive/pipedrive_api')

/**
 * Get all Users/persons who their gist are been monitored!
 */
router.get('/', async (req, res) => {
    const persons = await Person.find({ isDeleted: false });
    return res.send(persons)
})

/**
 * Get a User/person with all his gists
 */
router.get('/:name', async (req, res) => {
    const { name } = req.params
    const person = await Person.findOne({ name,isDeleted: false })
    if (person) return res.send(person)

    return res.status(404).send({ message: `User ${name} not found `})
})

/**
 * Add a new Person to the database to start monitoring his/her gists
 */
router.post('/add', async (req, res) => {
    const { name } = req.body

    const person = await Person.findOne({ name, isDeleted: false })
    if (person) return res.send({ message: `Person ${name} already exist`})

    const { data, status } = await createPerson(name);
    if (status == 201) {
        const { id, name } = data.data
        const dbPerson = new Person({ name, ppdvId: id })
        const savedPerson = await dbPerson.save();
        return res.status(status).send(savedPerson)
    }
    
    return res.status(200).send({ message: 'Internal Error'})
})

/**
 * Delete a Username or Person to stop monitoring his/her gists
 */
router.delete('/remove/:name', (req, res) => {
    return res.send({})
})

module.exports = router