const router = require('express').Router()
const Person = require('../model/Person')


const { createPerson } = require('../pipedrive/pipedrive_api')

router.get('/', async (req, res) => {
    const persons = await Person.find({ isDeleted: false });
    return res.send(persons)
})

router.get('/:name', async (req, res) => {
    const { name } = req.params
    const person = await Person.findOne({ name,isDeleted: false })
    if (person) return res.send(person)

    return res.status(404).send({ message: `User ${name} not found `})
})

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

router.delete('/person', (req, res) => {

})

module.exports = router