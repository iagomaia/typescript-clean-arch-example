import { MongoClient } from "mongodb"

export const MongoHelper: IMongoHelper = {
  mongoClient: undefined,

  async connect (uri: string) {
    this.mongoClient = await MongoClient.connect(process.env.MONGO_URL ?? '')
  },

  async disconnect () {
    await this.mongoClient.close()
  }
}

interface IMongoHelper {
  mongoClient?: MongoClient
  connect: (uri: string) => Promise<void>
  disconnect: () => Promise<void>
}
