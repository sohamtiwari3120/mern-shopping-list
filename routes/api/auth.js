const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const auth = require('./../../middleware/auth')

// User MODEL
const User = require('../../models/User')

// @route POST api/auth
// @desc Authenticate user
// @access Public
router.post('/', async (req, res) =>
{
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password)
        res.status(400).json({ 'message': 'Please enter all fields' })

    // Check for existing user
    let user = await User.findOne({ email: email })
    if (!user)
    {
        return res.status(400).json({ message: 'User does not exist.' })
    }

    // Validate user
    let isMatch = await bcrypt.compare(password, user.password)
    // note: bcrypt when hashing the text string with the salt generates a hash. The final hash is actually the salt with the generated hash appended to it.
    // hence in bcrypt.compare bcrypt can extract salt from the hash, and then generate the hash for te password using the extracted salt and then compares

    // isMatch a boolena value
    if (!isMatch)
    {
        return res.status(400).json({
            'message': 'Invalid Credentials.'
        })
    }

    // THIS JWT TOKEN IS VALID FOR AN HOUR AND IS RETURNED ONLY WHEN USER IS AUTHENTICATED
    jwt.sign(
        {
            // PAYLOAD
            id: user._id
        },
        process.env.JWTSECRET,
        {
            expiresIn: 3600//1 hour
        },
        (err, token) =>
        {
            if (err)
                throw err

            res.json({
                token: token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            })
        }
    )
})

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get('/user', auth, async (req, res) =>
{
    // the payload in the jwt token returned by authenticateUser containes id:user._id
    let user = await User.findById(req.user.id).select('-password')
    // "-password" implies return all fields of that document except the password

    if (user)
    {
        res.json(user)
    }
})

module.exports = router