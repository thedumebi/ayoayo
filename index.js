const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const PORT = process.env.PORT || 3000

const app = express()

// rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 500
})
app.use(limiter)
app.set('trust proxy', 1)

// set static folder
app.use(express.static('web'))

// Enable cors
app.use(cors())

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
