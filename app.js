const express = require(`express`)
const config = require("config")
const mongoose = require(`mongoose`)
const app = express()
const cors = require("./middleware/cors.js")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")
const PORT = process.env.PORT || 5000
require('dotenv').config()


app.use(cors)
app.use(express.json())
app.use("/api/auth", authRouter)
 app.use("/api/group", fileRouter)


const start = async () => {
    try {

   await  mongoose.connect(config.get("url"))

        app.listen(PORT, () => console.log(`app is  port ${PORT}`))

    } catch (error) {

        console.log("error", error)

    }
}

start()














