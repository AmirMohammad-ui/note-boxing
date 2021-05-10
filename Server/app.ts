import * as express from "express"
import * as cors from "cors"
import * as fileUpload from "express-fileupload"
const app = express()

import users from "./apis/users" 
import plan from "./apis/plan"

app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.use("/",users)
app.use("/",plan)


// app.all("*",(_,res)=>{
//   res.status(200).sendFile(path.join(__dirname,"../client/"))
// })


export default app