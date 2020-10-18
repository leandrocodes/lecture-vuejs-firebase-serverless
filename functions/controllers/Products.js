const db = require('../config/db')

const Products = {
  async create(req, res) {
    const { name, brand, price, quantity } = req.body

    const data = {
      name,
      brand,
      price,
      quantity
    }

    try {
      const productsRef = await db.collection('products').add(data)
      const product = await productsRef.get()

      res.status(201).json({
        UID: productsRef.id,
        data: product.data()
      })
    } catch (err) {
      res.status(500).json(err)
    }
  },

  async index(req, res) {
    try {
      const { docs } = await db.collection('products').get()
      const products = docs.map(doc => {
        return {
          id: doc.id,
          data: doc.data()
        }
      })

      res.status(200).json(products)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = Products
