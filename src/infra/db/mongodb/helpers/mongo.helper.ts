import { Collection, MongoClient } from "mongodb"

export const MongoHelper: IMongoHelper = {
  mongoClient: null,

  async connect (uri: string = process.env.MONGO_URL ?? "") {
    this.mongoClient = await MongoClient.connect(uri)
  },

  async disconnect () {
    await this.mongoClient.close()
    this.mongoClient = null
  },

  async collection (name: string): Promise<Collection> {
    if (!this.mongoClient) {
      await this.connect()
    }
    return this.mongoClient.db().collection(name)
  }
}

interface IMongoHelper {
  mongoClient: MongoClient | null
  connect: (uri: string) => Promise<void>
  disconnect: () => Promise<void>
  collection: (name: string) => Promise<Collection>
}
