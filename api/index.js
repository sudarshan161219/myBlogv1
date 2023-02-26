const express = require('express')
const app = express();
const cors = require('cors')
const connectDB = require('./db/connect')
require("dotenv").config();
const userModel = require('./models/user')

const port = process.env.PORT || 4000
app.use(cors())
app.use(express.json())


// data coming from Client --> src --> components --> register.jsx
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body
        const userDoc = await userModel.create({
            username,
            password
        })
        res.json(userDoc)
    } catch (error) {
        res.status(400).json({msg: {error}})
    }

})


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('connected to Db....');
        app.listen(port, console.log(`server is listening on port ${port}....`))
    } catch (error) {
        console.log(error);
    }

}

start()
