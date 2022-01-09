enum TYPE_OF_ERROR {
  CLIENT = "Client",
  SERVER = "Server"
}

export default class ErrorHandler extends Error {
  statusCode: number = 500 
  status: string
  constructor(message : string, statusCode?: number) {
    super(message)
    this.message = message
    if (statusCode) 
      this.statusCode = statusCode
    this.status = this.statusCode >= 400 && this.statusCode < 500 ? TYPE_OF_ERROR.CLIENT : TYPE_OF_ERROR.SERVER
    Error.captureStackTrace(this, this.constructor)
  }
}
