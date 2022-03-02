import { IAddUserRepository } from "../../../../data/protocols/add-user.repository";
import { User } from "../../../../domain/models/user";
import { AddUserDto } from "../../../../domain/use-cases/add-user";
import { MongoHelper } from "../helpers/mongo.helper";

export class UserMongoRepository implements IAddUserRepository {
  async add (dto: AddUserDto): Promise<User> {
    const userCollection = MongoHelper.collection('users');
    const result = await userCollection.insertOne(dto)
    return {
      _id: result.insertedId.toString(),
      ...dto
    }
  }
}