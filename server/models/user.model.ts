import * as mongoose from "mongoose";
import { Document } from "mongoose";
const Schema = mongoose.Schema;

interface UserSchemaType extends Document {
  info: {
    fname: string;
    lname: string;
  };
  cridentials: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  plans: any[];
}

const schema = new Schema<UserSchemaType>({
  info: {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
  },
  cridentials: {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 255,
    },
    confirmPassword: {
      type: String,
      require: true,
      minLength: 8,
      maxLength: 255,
    },
  },
  plans: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
});
schema.pre("save", (next) => {
  next();
});

const User = mongoose.model<UserSchemaType>("user", schema);

export default User;

