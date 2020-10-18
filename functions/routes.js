const express = require('express')
const router = express.Router()

const ProductController = require('./controllers/Products')

router.get('/hi', (req, res) => {
  res.json({ message: 'Hello there! :D' })
})

router.post('/products', ProductController.create)
router.get('/products', ProductController.index)
router.get('/products/:id', ProductController.show)
router.patch('/products/:id', ProductController.change)

module.exports = router
