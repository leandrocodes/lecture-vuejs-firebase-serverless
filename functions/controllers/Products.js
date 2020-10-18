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
  },

  async show(req, res) {
    const productID = req.params.id

    try {
      const product = await db
        .collection('products')
        .doc(productID)
        .get()

      if (product.exists) {
        res.status(200).json({
          id: product.id,
          data: product.data()
        })
      } else {
        throw new Error('Product does not exist.')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  },

  async change(req, res) {
    const productID = req.params.id
    const data = req.body

    try {
      const product = await db
        .collection('products')
        .doc(productID)
        .get()

      if (product.exists) {
        db.collection('products')
          .doc(productID)
          .update(data)

        res.status(204).send()
      } else {
        throw new Error('Product does not exist.')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  },

  async remove(req, res) {
    const productID = req.params.id

    try {
      const product = await db
        .collection('products')
        .doc(productID)
        .get()

      if (product.exists) {
        db.collection('products')
          .doc(productID)
          .delete()

        res.status(204).send()
      } else {
        throw new Error('Product does not exist.')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = Products
