import * as chalk from "chalk"
import * as mongoose from "mongoose"
const Schema = mongoose.Schema

const schema = new Schema ({
  info: {
    fname:{
      type:String,
      required:true
    },
    lname: {
      type:String,
      required: true
    },
  },
  cridentials: {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 255
    },
    confirmPassword: {
      type: String,
      require: true,
      minLength: 8,
      maxLength: 255
    }
  },
  plans: {
    type: [mongoose.Types.ObjectId],
    default: []
  }
})
schema.pre("save",next => {
  next()
})

const Users = mongoose.model("user",schema)

export default Users