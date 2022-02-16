import { Collection, MongoClient } from "mongodb"

export const MongoHelper: IMongoHelper = {
  mongoClient: null,

  async connect (uri: string) {
    this.mongoClient = await MongoClient.connect(process.env.MONGO_URL ?? '')
  },

  async disconnect () {
    await this.mongoClient.close()
  },

  collection (name: string): Collection {
    return this.mongoClient.db().collection(name)
  }
}

interface IMongoHelper {
  mongoClient: MongoClient | null
  connect: (uri: string) => Promise<void>
  disconnect: () => Promise<void>
  collection: (name: string) => Collection
}
