const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// User MODEL
const User = require('../../models/User')

// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', async (req, res) =>
{
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password)
        res.status(400).json({ 'message': 'Please enter all fields' })

    // Check for existing user
    let user = await User.findOne({ email: email })
    if (user)
    {
        return res.status(400).json({ message: 'User already exists.' })
    }

    const newUser = new User({
        name, email, password
    })

    // Create salt and hash
    bcrypt.genSalt(10, (err, salt) =>
    {
        bcrypt.hash(newUser.password, salt, async (err, hash) =>
        {
            if (err)
            {
                throw err;
            }
            newUser.password = hash;
            let new_user = await newUser.save()
            if (new_user)
            {
                jwt.sign(
                    {
                        // PAYLOAD
                        id: new_user._id
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
                                id: new_user._id,
                                name: new_user.name,
                                email: new_user.email
                            }
                        })
                    }
                )

            }

        })
    }
    )

})


module.exports = router