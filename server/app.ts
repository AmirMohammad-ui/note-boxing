import * as express from "express"
import * as morgan from "morgan"
import * as cors from "cors"
import * as fileUpload from "express-fileupload"
import errors from "./middlewares/ErrorHandler"
import ErrorHandler from "./utilities/ErrorHandler"
const app = express()
import { config as configEnv } from "dotenv";
configEnv({
  path: ".env",
});
import * as RedisConnect from "connect-redis";
import * as session from "express-session";
import redis from "./utilities/redis-client";

import users from "./apis/users" 
import plan from "./apis/plan"

app.use(express.json())
app.use(cors())
app.use(fileUpload({
  limits: {
    fileSize: 1*1024*1024
  },
  useTempFiles: true,
  tempFileDir: "./temp/"
}))
app.use(morgan("dev"))
const RedisStore = RedisConnect(session);
app.use(express.json());
app.use(
  "/static/images",
  express.static(path.join(__dirname, "./uploads/images/"))
);
app.use(cors());
app.use(helmet());
app.use(sanitize());
app.use(
  session({
    name: "session_id_",
    secret: process.env.SESSION_SECRET!,
    store: new RedisStore({ client: redis }),
    saveUninitialized: true,
    resave: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
      httpOnly: true,
      maxAge: +process.env.SESSION_MAX_AGE! * 24 * 1000 * 60 * 60,
    },
  })
);

// app.use("/api",users,plan)
app.use("/api",users)
app.use("/api",plan)

app.all("*", (req,_,next)=> {
  next(new ErrorHandler(`NOT FOUND: ${req.originalUrl}`,404))
})
app.use(errors)
// app.all("*",(_,res)=>{
//   res.status(200).sendFile(path.join(__dirname,"../client/"))
// })


export default app