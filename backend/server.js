const express = require('express')
const cors = require('cors')
const truckRouter = require('./routes/truckRoutes')
const connectDB = require('./mongoConnection')
const uploadRouter = require('./routes/uploadRouter');
const userRoute = require('./routes/users')
const PORT = 3001
const app = express()
const path = require('path')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../build")))


app.use('/truck', truckRouter)
app.use('/imageUpload', uploadRouter);
app.use('/users', userRoute);

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"))
})

// app.get('/', (req, res) => {
// res.send('hello trucks')
// })

app.listen(process.env.PORT || PORT, async () => {
    await connectDB();
    console.log(`server is running at ${PORT}`)
  })