const express = require('express')
const app = express();
const cors = require('cors')
const connectDB = require('./db/connect')
require("dotenv").config();
const bcrypt = require('bcryptjs');
const userModel = require('./models/user');
const jwt = require('jsonwebtoken');

const privateKey = 'randomString'
const salt = bcrypt.genSaltSync(10)


const port = process.env.PORT || 4000
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())


// data coming from Client --> src --> components --> register.jsx
// adding users username and password to database
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body
        const userDoc = await userModel.create({
            username,
            password: bcrypt.hashSync(password, salt)
        })
        res.json(userDoc)
    } catch (error) {
        res.status(400).json({ msg: { error } })
    }

})

// data coming from Client --> src --> components --> login.jsx
// checking users username and password from database 
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const userDoc = await userModel.findOne({ username })
        const passOk = bcrypt.compareSync(password, userDoc.password)
        res.json(passOk)
        if (passOk) {
            // user logged in
            // res.json(passOk)
            jwt.sign({ username, id: userDoc._id }, privateKey, {}, (err, token) => {
                if (!err) {
                    res.cookie('token', token).json('ok')
                } else {
                    console.log(err);
                }
            })
        } else {
            res.status(400).json({ msg: 'bad user credentials' })
        }
    } catch (error) {
        res.status(400).json({ msg: { error } })
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
