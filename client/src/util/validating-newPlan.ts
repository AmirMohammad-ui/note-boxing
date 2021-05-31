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
        type: ErrTypes.required, 
        field, 
        message: `${field} is required, please enter the appropriate value.`
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
        type: ErrTypes.min, 
        field, 
        message: `Minimum number of charachtors for ${field} is ${min}.`
      })
    } 
  }

  static max(max:number) {
    const {value, errorMessages, field} = new Validate()
    if(value instanceof File && value.size > max) {
      errorMessages.push({
        type: ErrTypes.max, 
        field, 
        message: `Maximum size for ${field} is ${max}.`
      })
    } else if(typeof value === "string" && value.length>max) {
      errorMessages.push({
        type: ErrTypes.max, 
        field, 
        message: `Maximum number of charachtors for ${field} is ${max}.`
      })
    } 
  }
  static email() {}
  static alphanumeric() {}
  static string() {
    const {errorMessages,value,field} = new Validate()
    if(typeof value !== 'string') {
      errorMessages.push({
        type: "isString",
        field,
        message: `This field must be a string.`
      })
    }
  }
  static number() {
    const {errorMessages,value,field} = new Validate()
    if(typeof value !== "number") {
      errorMessages.push({
        type: "isNumber",
        field,
        message: `This field must be a number.`
      })
    }
  }
  static date(options: {
    "yyyy/mm/dd"?: boolean;
    "yyyy-mm-dd"?: boolean;
    "Mon dd yyyy"?: boolean;
    "Month dd yyyy"?: boolean
  }={"yyyy-mm-dd":true}) {
    const { value,field,errorMessages } = new Validate()
    if (options['Mon dd yyyy']) {
      const datePattern = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[\d\d]\s[\d\d\d\d]/
      if(!value.toString().match(datePattern)) {
        errorMessages.push({
        type: ErrTypes.date,
        field,
        message: `${value} is not a valid Date.`
        })
      }
    } else if (options['Month dd yyyy']) {
      const datePattern = /(January|February|March|May|June|July|November|December|April|August|September|October)\s[\d\d]\s[\d\d\d\d]/
      if(!value.toString().match(datePattern)) {
        errorMessages.push({
        type: ErrTypes.date,
        field,
        message: `${value} is not a valid Date.`
        })
      }
    } else if (options["yyyy-mm-dd"]) { 
      const datePattern = /\d\d\d\d-\d\d-\d\d/
      if(!value.toString().match(datePattern)) {
        errorMessages.push({
        type: ErrTypes.date,
        field,
        message: `${value} is not a valid Date.`
        })
      }
    } else if (options['yyyy/mm/dd']) {
      const datePattern = /\d\d\d\d\/\d\d\/\d\d]/
      if(!value.toString().match(datePattern)) {
        errorMessages.push({
        type: ErrTypes.date,
        field,
        message: `${value} is not a valid Date.`
        })
      }
    }
  }
  static boolean() {
    const bool = ['true','false',true,false,1,0]
    const { value,field,errorMessages } = new Validate()
    if(!(value as any in bool)) {
      errorMessages.push({
        type: '',
        field,
        message: ``
      })
    }
  }
  static file() {
    const { value,field,errorMessages } = new Validate()
    if(!(value instanceof File)) {
      errorMessages.push({
        type: ErrTypes.file,
        field,
        message: `${value} is not a file.`
      })
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
