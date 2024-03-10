import mongoose from 'mongoose'

const connectionString = process.env.MONGODB_URI

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(connectionString, { dbName: process.env.DB_NAME })
      .then(() => {
        console.log('Connected to MongoDB')
      }).catch((err) => { console.log(err) })

    if (true) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    mongoose.connection.on('disconnected', () => {
      console.log('mongodb disconnected')
    })
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database()
    }
    return this.instance
  }
}

const instance = Database.getInstance()

export default instance