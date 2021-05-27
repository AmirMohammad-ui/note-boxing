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

class Validate {
  private errorMessages : ErrMsg[] = []
  private value : string | number | boolean | File = '';
  private field : string = '';
  static validate(value : string, field : string) {
    const validateObj = new Validate()
    validateObj.value = value
    validateObj.field = field
  }
  static required() {
    const validateObj = new Validate()
    const {value, errorMessages, field} = validateObj
    if (!value) {
      errorMessages.push({
        type: 'required', 
        field, 
        message: `${field} is required, please enter the appropriate value `
      })
    }
    return this
  }
  static min(min : number) {
    const {value, errorMessages, field} = new Validate()
    if (typeof value === 'number' && value < min) {
      errorMessages.push({type: 'min-number', field, message: `Minimum valid value for ${field} is ${min}.`})
    } else if(typeof value === "string" && value.length<min) {
      errorMessages.push({
        type: 'min-string', 
        field, 
        message: `Minimum number of charachtors for ${field} is ${min}.`
      })
    } 
  }

  static max(max:number) {
    const {value, errorMessages, field} = new Validate()
    if(value instanceof File && value.size > max) {
      errorMessages.push({
        type: 'max-size', 
        field, 
        message: `Maximum size for ${field} is ${max}.`
      })
    }
  }
  static email() {}
  static alphanumeric() {}
  static string() {}
  static number() {}
  static boolean() {}
  static file() {}

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
