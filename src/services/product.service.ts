import { ObjectId } from 'mongodb'
import { Product, Clothing, Electronic, IProduct, IElectronic, IClothing } from '../models/product.model'

class ProductFactory {
  static async createProduct(type: string, payload: IProduct) {
    if (type === 'Clothing')
      return await new ClothingProduct(payload).createProduct()
    else if (type === 'Electronic')
      return await new ElectronicProduct(payload).createProduct()
    else throw Error('invalid product type')
  }
}

class ProductClass implements IProduct {
  product_name: string
  product_thumb: string
  product_description: string
  product_price: number
  product_quantity: number
  product_shop: string
  product_attributes: IClothing | IElectronic
  createdAt?: Date
  updatedAt?: Date

  constructor(product: IProduct) {
    this.product_name = product.product_name
    this.product_thumb = product.product_thumb
    this.product_description = product.product_description
    this.product_price = product.product_price
    this.product_quantity = product.product_quantity
    this.product_shop = product.product_shop
    this.product_attributes = product.product_attributes
  }

  async createProduct() {
    this.createdAt = new Date(Date.now())
    this.updatedAt = new Date(Date.now())
    return await Product.insertOne(this)
  }
}

class ElectronicProduct extends ProductClass {
  async createProduct() {
    const newElectronic = await Electronic.insertOne(this.product_attributes as IElectronic)
    if (!newElectronic) throw new Error('Electronic not created')
    const newProduct = await super.createProduct()
    return newProduct
  }
}

class ClothingProduct extends ProductClass {
  async createProduct() {
    const newClothing = await Clothing.insertOne(this.product_attributes as IClothing)
    if (!newClothing) throw new Error('Clothing not created')
    const newProduct = await super.createProduct()
    return newProduct
  }
}

export default ProductFactory