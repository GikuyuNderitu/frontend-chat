const express = require('express')
const app = express()
const PORT = process.ENV || 1337

app.use(express.static('./'))

app.listen(PORT, () => {console.log(`Running on port ${PORT}`)})

