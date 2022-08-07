
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getByUserEmail,
    add,
    getById
}

async function query() {
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find({}).toArray()
        users = users.map(user => {
            delete user.password
            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ _id: ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        logger.error(`while finding user ${userId}`, err)
        throw err
    }
}

async function getByUserEmail(email) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        logger.error(`while finding userEmail ${email}`, err)
        throw err
    }
}

async function add(user) {
    try {
        const userToAdd = {
            name: utilService.capitalizeWords(user.name),
            email: user.email,
            password: user.password,
            imgUrl: "https://xsgames.co/randomusers/assets/avatars/" + utilService.getRandomGender() + "/" + utilService.getRandomInt(0, 79) + ".jpg",
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}
