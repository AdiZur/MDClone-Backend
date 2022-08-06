const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

async function login(email, password) {
    logger.debug(`auth.service - login with Email: ${email}`)
    const user = await userService.getByUserEmail(email)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')
    delete user.password
    user._id = user._id.toString()
    return user
}

async function register({ name, email, password }) {
    const saltRounds = 10
    logger.debug(`auth.service - register with name: ${name}`)
    if (!name || !email || !password) return Promise.reject('Missing required register information')
    const userExist = await userService.getByUserEmail(email)
    if (userExist) return Promise.reject('Email is already in use')
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ name, password: hash, email })
}

function getLoginToken(user) {
    return cryptr.encrypt(JSON.stringify(user))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser

    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}


module.exports = {
    register,
    login,
    getLoginToken,
    validateToken
}