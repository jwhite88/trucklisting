const express = require('express')
const cors = require('cors')
const truckRouter = require("../../backend/routes/truckRoutes")
const connectDB = require('../../backend/mongoConnection')
const uploadRouter = require('../../backend/routes/uploadRouter');
const userRoute = require('../../backend/routes/users')
// const PORT = 3001
const app = express()
const path = require('path')
const serverless = require("serverless-http")


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../../backend/build")))


app.use('/truck', truckRouter)
app.use('/imageUpload', uploadRouter);
app.use('/users', userRoute);

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../backend/build/index.html"))
})

// app.get('/', (req, res) => {
// res.send('hello trucks')
// })

// app.listen(process.env.PORT || PORT, async () => {
//     await connectDB();
//     console.log(`server is running at ${PORT}`)
//   })

module.exports.handler = serverless(app)