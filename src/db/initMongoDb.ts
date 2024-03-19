import * as mongodb from 'mongodb'
import * as dotenv from 'dotenv'

dotenv.config()

class Database {
  private static instance: Database | null = null
  private db: mongodb.Db | null = null

  private constructor() { }

  public static async getInstance(): Promise<Database> {
    if (!Database.instance) {
      Database.instance = new Database()
      await Database.instance.connect()
    }
    return Database.instance
  }

  private async connect(): Promise<void> {
    try {
      const client: mongodb.MongoClient = new mongodb.MongoClient(process.env.MONGODB_URI!, { monitorCommands: true })
      await client.connect()
      this.db = client.db(process.env.DB_NAME)
      console.log(`Successfully connected to database: ${this.db.databaseName} (MongoDb driver)`)

      client.on('commandStarted', (event) => console.debug('Command started:', event.commandName))
      client.on('commandSucceeded', (event) => console.debug('Command succeeded:', event.commandName))
      client.on('commandFailed', (event) => console.debug('Command failed:', event.commandName))
    } catch (error) {
      console.error('Error connecting to database:', error)
    }
  }

  public getDb(): mongodb.Db {
    if (!this.db) {
      throw new Error('Database connection has not been established')
    }
    return this.db
  }
}

export default (await Database.getInstance()).getDb()
