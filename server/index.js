const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const postRoutes = require('./routes/posts-routes')
const userRoutes = require('./routes/users-routes')

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors())

app.use('/posts',postRoutes)
app.use('/user',userRoutes)

mongoose.connect(process.env.CONNECTION_URL)
.then(() => app.listen(PORT,() => console.log(`server started at http://localhost:${PORT}`)))
.catch(error => console.log(error.message))