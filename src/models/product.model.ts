import { ObjectId } from 'mongodb'
import db from '../db/initMongoDb'

export interface IProduct {
  product_name: string;
  product_thumb: string;
  product_description: string;
  product_price: number;
  product_quantity: number;
  product_shop: string;
  product_attributes: (IClothing | IElectronics)[];
  product_id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IClothing {
  brand: string;
  size?: string;
  color?: string;
}

export interface IElectronics {
  brand: string;
  model?: string;
  color?: number;
}

const Clothing = db.collection<IClothing>('clothing')
const clothingSchema = {
  bsonType: 'object',
  required: ['brand'],
  additionalProperties: false,
  properties: {
    _id: {},
    brand: {
      bsonType: 'string',
      description: '\'brand\' is required and is a string'
    },
    size: {
      bsonType: 'string',
      description: '\'size\' is an optional field and is a string'
    },
    color: {
      bsonType: 'string',
      description: '\'color\' is an optional field and is a string'
    }
  }
}
await db.command({
  'collMod': 'clothing',
  'validator': {
    $jsonSchema: clothingSchema
  }
})

const Electronics = db.collection<IElectronics>('electronics')
const electronicsSchema = {
  bsonType: 'object',
  required: ['brand'],
  additionalProperties: false,
  properties: {
    _id: {},
    brand: {
      bsonType: 'string',
      description: '\'brand\' is required and is a string'
    },
    model: {
      bsonType: 'string',
      description: '\'model\' is an optional field and is a string'
    },
    color: {
      bsonType: 'number',
      description: '\'color\' is an optional field and is a number'
    }
  }
}
await db.command({
  'collMod': 'electronics',
  'validator': {
    $jsonSchema: electronicsSchema
  }
})

const Product = db.collection<IProduct>('products')

const productSchema = {
  bsonType: 'object',
  required: ['product_name', 'product_price', 'product_shop'],
  additionalProperties: false,
  properties: {
    _id: {},
    product_name: {
      bsonType: 'string',
      description: '\'product_name\' is required and is a string'
    },
    product_thumb: {
      bsonType: 'string',
      description: '\'product_thumb\' is required and is a string'
    },
    product_description: {
      bsonType: 'string',
      description: '\'product_description\' is required and is a string'
    },
    product_price: {
      bsonType: 'number',
      description: '\'product_price\' is required and is a number'
    },
    product_quantity: {
      bsonType: 'number',
      description: '\'product_quantity\' is required and is a number'
    },
    product_shop: {
      bsonType: 'string',
      description: '\'product_shop\' is required and is a string'
    },
    product_attributes: {
      bsonType: 'array',
      description: '\'product_attributes\' is required and is an array'
    },
    product_id: {
      bsonType: 'objectId',
      description: '\'product_id\' is an optional field and is an objectId'
    },
    createdAt: {
      bsonType: 'date',
      description: '\'createdAt\' is an optional field and is a date'
    },
    updatedAt: {
      bsonType: 'date',
      description: '\'updatedAt\' is an optional field and is a date'
    }
  }
}

await db.command({
  'collMod': 'products',
  'validator': {
    $jsonSchema: productSchema
  }
})

export default { Product, Clothing, Electronics }