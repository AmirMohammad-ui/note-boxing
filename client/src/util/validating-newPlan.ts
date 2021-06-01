import isEmail from "validator/lib/isEmail"
import isDate from "validator/lib/isDate"
import isAlphaNumeric from "validator/lib/isAlphanumeric"
interface File {
  mimetype: string
  size: number
  md5: string
}
interface ErrMsg {
  type: string,
  invalid_part?: string | number,
  field: string,
  message: string
}
enum ErrTypes {
  required = 'REQUIRED',
  isString = 'STRING',
  isNumber = 'NUMBER',
  isBool = 'BOOLEAN',
  min = 'MINIMUM',
  max = 'MAXIMUM',
  email = 'EMAIL',
  date = 'DATE',
  alphanumeric = "ALPHANUM",
  file = "File"
}

export default class Validate {
  private errorMessages : ErrMsg[] = []
  private value : string | number | boolean | File = '';
  private field : string = '';
  static validate(value : string, field : string) {
    const validateObj = new Validate()
    validateObj.value = value.trim()
    validateObj.field = field.trim()
  }
  registerError(type: ErrTypes,message: string) {
    const {errorMessages,field} = new Validate()
    errorMessages.push({
      type,
      field,
      message,
    })
  }
  static required() {
    const obj = new Validate()
    const {value, field} = obj
    if (!value) {
      obj.registerError(ErrTypes.required,`${field} is required, please enter the appropriate value.`)
    }
    return this
  }
  static min(min : number) {
    const obj = new Validate()
    const {value,field} = obj
    if (typeof value === 'number' && value < min) {
      obj.registerError(ErrTypes.min,`Minimum valid value for ${field} is ${min}.`)
    } else if(typeof value === "string" && value.length<min) {
      obj.registerError(ErrTypes.min,`Minimum number of charachtors for ${field} is ${min}.`)
    } 
  }

  static max(max:number) {
    const obj = new Validate()
    const {value, field} = obj
    if(value instanceof File && value.size > max) {
      obj.registerError(ErrTypes.file,`Maximum size for ${field} is ${max}.`)
    } else if(typeof value === "string" && value.length>max) {
      obj.registerError(ErrTypes.max,`Maximum number of charachtors for ${field} is ${max}.`)
    } 
  }
  static email() {
    const obj = new Validate()
    const { value } = obj
    const isValid = isEmail(value as string)
    if(!isValid) {
      obj.registerError(ErrTypes.email,`${value} is not a valid email address.`)
    }
  }
  static alphanumeric() {
    const obj = new Validate()
    const {value} = obj
    const isValid = isAlphaNumeric(value as string)
    if(!isValid) {
      obj.registerError(ErrTypes.alphanumeric,`${value} must be string or number or a combination of both.`)
    }
  }
  static string() {
    const obj = new Validate()
    const {value} = obj
    if(typeof value !== 'string') {
      obj.registerError(ErrTypes.isString,`${value} must be a string.`)
    }
  }
  static number() {
    const obj = new Validate()
    const {value} = new Validate()
    if(typeof value !== "number") {
      obj.registerError(ErrTypes.isNumber,`${value} must be a number.`)
    }
  }
  static date() {
    const obj = new Validate()
    const {value} = obj
    const isValid = isDate(value as string)
    if(!isValid) {
      obj.registerError(ErrTypes.date,`${value} is not a valid date.`)
    }
  }
  static boolean() {
    const obj = new Validate()
    const bool = ['true','false',true,false,1,0]
    const { value } = obj
    if(!(value as any in bool)) {
      obj.registerError(ErrTypes.isBool,`${value} is not a file.`)
    }
  }
  static file() {
    const obj = new Validate()
    const { value } = obj
    if(!(value instanceof File)) {
      obj.registerError(ErrTypes.file, `${value} is not a file.`)
    }
  }

  static errors(options: {messagesOnly?: boolean;fieldsOnly?: boolean; }) {
    const {errorMessages} = new Validate()
    const errors = []
    if(options.fieldsOnly) {
      errors.push(errorMessages.map(err=> err.message) )
    } else if (options.fieldsOnly) {
      errors.push(errorMessages.map(err => err.field))
    } else {
      errors.push(errorMessages.map(err => ({field: err.field, message: err.message})))
    }
    return errors
  }
}
