import { SignUpController } from "../../presentation/controllers/signup/signup";
import { EmailValidatorAdapter } from '../../utils/email-validator.adapter'
import { DbAddUser } from "../../data/use-cases/add-user/db-add-user";
import { BcryptAdapter } from "../../infra/cryptography/bcrypt.adapter"
import { UserMongoRepository } from "../../infra/db/mongodb/user/user.repository";
import { IController } from "../../presentation/protocols";
import { LogControllerDecorator } from "../decorators/log.decorator";

export const makeSignupController = (): IController => {
  const emailValidator = new EmailValidatorAdapter()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userRepo = new UserMongoRepository()
  const addUser = new DbAddUser(bcryptAdapter, userRepo)
  const signupController = new SignUpController(emailValidator, addUser)
  return new LogControllerDecorator(signupController)
}