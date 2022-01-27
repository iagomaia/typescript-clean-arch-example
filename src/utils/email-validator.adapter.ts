import { IValidator } from '../presentation/protocols'
import validator from 'validator'

export class EmailValidatorAdapter implements IValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
