const express = require('express')
const bodyParser = require('body-parser')

const { PORT } = require('./config')
const logger = require('./utils/logger')
const getFileFromAbsolutePath = require('./utils/getFileFromAbsolutePath')
const productRoutes = require('./routing/product')
const logoutRoutes = require('./routing/logout')
const killRoutes = require('./routing/kill')
const homeRoutes = require('./routing/home')
const { STATUS_CODE } = require('./constants/statusCode')

const app = express()

app.set('view engine', 'ejs')

app.set('views', getFileFromAbsolutePath('views'))

app.use(express.static(getFileFromAbsolutePath('public')))

app.use(bodyParser.urlencoded({ extended: false }))

app.use((request, _response, next) => {
  const { url, method } = request

  logger.getInfoLog(url, method)
  next()
})

app.use('/products', productRoutes)
app.use('/logout', logoutRoutes)
app.use('/kill', killRoutes)
app.use(homeRoutes)

app.use((request, response) => {
  const { url } = request

  response
    .status(STATUS_CODE.NOT_FOUND)
    .sendFile(getFileFromAbsolutePath('views/404.html'))

  logger.getErrorLog(url)
})

app.listen(PORT)
