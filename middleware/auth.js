const jwt = require('jsonwebtoken')
require('dotenv').config()

function auth(req, res, next)
{
    const token = req.header('x-auth-token')

    // Check for token
    if (!token)
    {
        return res.status(401).json({
            "message": "No token, authorization denied"
        })
    }

    try
    {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWTSECRET)

        // Add user from jwt payload
        req.user = decoded
        next()
    } catch (e)
    {
        res.status(400).json({
            "message": "Token is not valid"
        })
    }

}

module.exports = auth