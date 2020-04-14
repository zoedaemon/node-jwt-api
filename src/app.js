const express = require('express')
const port = process.env.PORT
const userRouter = require('./routers/user')
require('./db/db')

const app = express()

app.use(express.json())
app.use(userRouter)

if (process.env && process.env.NODE_ENV != 'test') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}


module.exports = app