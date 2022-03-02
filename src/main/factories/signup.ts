import { SignUpController } from "../../presentation/controllers/signup/signup";
import { EmailValidatorAdapter } from '../../utils/email-validator.adapter'
import { DbAddUser } from "../../data/use-cases/add-user/db-add-user";
import { BcryptAdapter } from "../../infra/cryptography/bcrypt.adapter"
import { UserMongoRepository } from "../../infra/db/mongodb/user/user.repository";

export const makeSignupController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userRepo = new UserMongoRepository()
  const addUser = new DbAddUser(bcryptAdapter, userRepo)
  return new SignUpController(emailValidator, addUser)
}