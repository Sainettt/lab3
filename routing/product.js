const express = require('express')
const { STATUS_CODE } = require('../constants/statusCode')
const { MENU_LINKS } = require('../constants/navigation')
const productsSlice = require('../store/products')

const router = express.Router()

router.get('/', (_req, res) => {
  res.render('products', {
    headTitle: 'Shop – Products',
    path: '/',
    menuLinks: MENU_LINKS,
    activeLinkPath: '/products',
    products: productsSlice.products,
  })
})

router.get('/add', (_req, res) => {
  res.render('add-product', {
    headTitle: 'Shop – Add product',
    path: '/add',
    menuLinks: MENU_LINKS,
    activeLinkPath: '/products/add',
  })
})

router.post('/add', (req, res) => {
  const { name, description } = req.body
  const product = { name, description }
  productsSlice.newestProduct = product
  productsSlice.products.push(product)
  res.status(STATUS_CODE.FOUND).redirect('/products/new')
})

router.get('/new', (_req, res) => {
  res.render('newest-product', {
    headTitle: 'Shop – Newest product',
    path: '/new',
    menuLinks: MENU_LINKS,
    activeLinkPath: '/products/new',
    newestProduct: productsSlice.newestProduct,
  })
})

module.exports = router
