const express = require('express')
const app = express();
const cors = require('cors')
const connectDB = require('./db/connect')
require("dotenv").config();
const bcrypt = require('bcryptjs');
const userModel = require('./models/user');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer  = require('multer')
const uploadMiddleWare = multer({ dest: 'uploads/' })
// const { get } = require('mongoose');



const salt = bcrypt.genSaltSync(10)


const port = process.env.PORT || 4000
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

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
        if (passOk) {
            // user logged in
            // const accesToken = jwt.sign({ username, id: userDoc._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '600s'}, (err, token) => {
            //     if (err) throw err;
            //     res.cookie('token', token).status(200).json({
            //         id: userDoc._id,
            //         username
            //     });
            // })

            const accessToken = jwt.sign({ username, id: userDoc._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s' })

            const refreshToken = jwt.sign({ username, id: userDoc._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

            res.cookie('jwtT', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).status(200).json({ success: true  });


            // const otherUsers = userModel.User.filter(person => person.username !== userDoc.username)
            // const currentUser = {... userDoc, refreshToken}

        } else {
            res.status(400).json('bad user credentials')
        }
    } catch (error) {
        console.log(error);
    }
})


app.get('/profile', (req, res) => {
    const { jwtT } = req.cookies

    jwt.verify(jwtT, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) throw err;
        res.json(decoded).status(200).json({ success: true });

    })
})


app.post('/logout', (req, res) => {
    res.cookie('jwtT', '').status(200).json({ success: true });
})

app.post('/post', uploadMiddleWare.single('file'),  (req, res) => {
   res.json(req.files.file)
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
