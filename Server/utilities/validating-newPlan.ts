// import isEmail from "validator/lib/isEmail"
// import isDate from "validator/lib/isDate"

// interface File {
//   mimetype: string
//   size: number
//   md5: string
// }
// interface ErrMsg {
//   type: string,
//   invalid_part?: string | number,
//   field: string,
//   message: string
// }
// enum ErrTypes {
//   required = 'REQUIRED',
//   isString = 'STRING',
//   isNumber = 'NUMBER',
//   isBool = 'BOOLEAN',
//   min = 'MINIMUM',
//   max = 'MAXIMUM',
//   email = 'EMAIL',
//   date = 'DATE',
//   alphanumeric = "ALPHANUM",
//   file = "File"
// }

// export default class Validate {
//   errorMessages : ErrMsg[] = []
//   value : string | number | boolean | File = '';
//   field : string = '';
//   validate(value : string | number | boolean | File, field : string) {
//     this.value = typeof value === "string" ? value.trim() : value
//     this.field = field.trim()
//     return this
//   }
//   registerError(type: ErrTypes,message: string) {
//     const { errorMessages } = this
//     errorMessages.push({
//       type,
//       field:this.field,
//       message,
//     })
//     return this
//   }
//   required() {
//     const {value, field} = this
//     if (!value) {
//       this.registerError(ErrTypes.required,`${field} is required, please enter the appropriate value.`)
//     }
//     return this
//   }
//   min(min : number) {
//     const {value,field} = this
//     if (typeof value === 'number' && value < min) {
//       this.registerError(ErrTypes.min,`Minimum valid value for ${field} is ${min}.`)
//     } else if(typeof value === "string" && value.length<min) {
//       this.registerError(ErrTypes.min,`Minimum number of charachtors for ${field} is ${min}.`)
//     } 
//     return this
//   }

//   max(max:number) {
//     const {value, field} = this
//     const file = value as File
//     if(file&&file.mimetype && file.size > max) {
//       this.registerError(ErrTypes.file,`Maximum size for ${field} is ${max}.`)
//     } else if(typeof value === "string" && value.length>max) {
//       this.registerError(ErrTypes.max,`Maximum number of charachtors for ${field} is ${max}.`)
//     } 
//     return this
//   }
//   email() {
//     const { value } = this
//     const isValid = isEmail(value as string)
//     if(!isValid) {
//       this.registerError(ErrTypes.email,`\"${value}\" is not a valid email address.`)
//     }
//     return this
//   }
//   string() {
//     const {value} = this
//     if(typeof value !== 'string') {
//       this.registerError(ErrTypes.isString,`\"${value}\" must be a string.`)
//     }
//     return this
//   }
//   number() {
//     const {value} = this
//     if(typeof value !== "number") {
//       this.registerError(ErrTypes.isNumber,`\"${value}\" must be a number.`)
//     }
//     return this
//   }
//   date() {
//     const {value} = this
//     const isValid = isDate(value as string)
//     if(!isValid) {
//       this.registerError(ErrTypes.date,`\"${value}\" is not a valid date.`)
//     }
//     return this
//   }
//   boolean() {
//     const bool = ['true','false',true,false,1,0]
//     const { value } = this
//     if(!(value as any in bool)) {
//       this.registerError(ErrTypes.isBool,`\"${value}\" is not a file.`)
//     }
//     return this
//   }
//   file() {
//     const { value } = this
//     if(!(value instanceof File)) {
//       this.registerError(ErrTypes.file, `\"${value}\" is not a file.`)
//     }
//     return this
//   }

//   errors(options: {messagesOnly?: boolean;fieldsOnly?: boolean;bothFieldMessage?: boolean }={
//     bothFieldMessage: true
//   }) {
//     const {errorMessages} = this
//     const errors = []
//     if(options.fieldsOnly) {
//       errors.push(errorMessages.map(err=> err.message) )
//     } else if (options.fieldsOnly) {
//       errors.push(errorMessages.map(err => err.field))
//     } else {
//       errors.push(errorMessages.map(err => ({field: err.field, message: err.message})))
//     }
//     return errorMessages.length > 0?errors:false
//   }
// }
