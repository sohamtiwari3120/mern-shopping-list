const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const path = require('path')// CORE NodeJS module, no need to install

require('dotenv').config()
const items = require('./routes/api/items')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')

const app = express()

// Bodyparser Middleware
app.use(express.json())

// Connect to MongoDB
connectDB();

// Use Routes
app.use('/api/items', items)
app.use('/api/users', users)
app.use('/api/auth', auth)

// Serve static assets if we are in production
if (process.env.NODE_ENV === 'production')
{
    console.log('USING PRODUCTION BUILD')
    // Set static folder
    app.use(express.static(path.join(__dirname, 'client/build')))

    // app.get('*', (req, res) =>
    // {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    // })
}

// User CORS
app.use(cors())

const PORT = process.env.PORT || 5000

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })