const express = require('express'), app = express()
const compression = require('compression')

app.use(compression())

app.use('/', express.static('./dist'))
app.use('*', express.static('./dist'))

app.listen(8080)

console.log('Server listening on port 8080')