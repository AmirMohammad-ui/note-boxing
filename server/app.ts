import { config as configEnv } from "dotenv";
configEnv({
  path: ".env",
});
import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import * as fileUpload from "express-fileupload";
import * as RedisConnect from "connect-redis";
import * as session from "express-session";
import * as passport from "passport";
import redis from "./utilities/redis-client";
import setupPassport from "./utilities/passport";
import * as helmet from "helmet";
import * as sanitize from "express-mongo-sanitize";
import * as path from "path";
import errors from "./middlewares/ErrorHandler";
import ErrorHandler from "./utilities/ErrorHandler";
const app = express();

import users from "./apis/users";
import plan from "./apis/plan";
import auth from "./apis/auth";

// --------------- GENERAL MIDDLEWARES
app.use(express.json());
app.use(
  "/static/images",
  express.static(path.join(__dirname, "./uploads/images/"))
);
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", true);
}
// --------------- SETTING UP SESSION
const RedisStore = RedisConnect(session);
app.use(
  session({
    name: "session_id_",
    secret: process.env.SESSION_SECRET!,
    store: new RedisStore({ client: redis }),
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      httpOnly: true,
      maxAge: +process.env.SESSION_MAX_AGE! * 24 * 1000 * 60 * 60,
    },
  })
);
// --------------- SETTING UP PASSPORT
setupPassport(passport);
app.use(passport.initialize());
app.use(passport.session());
// --------------- SECURITY
app.use(
  cors({
    origin: [
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080"
        : "https://demo.portfolio.amirmuha.com/note-boxing",
    ],
    credentials: true,
  })
);
app.use(helmet());
app.use(sanitize());
app.use(
  fileUpload({
    limits: {
      fileSize: 1 * 1024 * 1024,
    },
    useTempFiles: false,
    // tempFileDir: "./temp/",
  })
);
app.use(morgan("dev"));

// app.use("/api",users,plan)
app.use("/api", users);
app.use("/api", plan);
app.use("/api", auth);

// app.all("*", (req, _, next) => {
//   next(new ErrorHandler(`NOT FOUND: ${req.originalUrl}`, 404));
// });
app.use(errors);
app.all("*", (_, res) => {
  if (process.env.NODE_ENV === "production") {
    res
      .status(200)
      .sendFile(path.join(__dirname, "../client/public/index.html"));
  } else if (process.env.NODE_ENV === "development") {
    res.end("Hi, looking for something ?");
  }
});

export default app;
