const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express();
const cors = require('cors')
const connectDB = require('./db/connect')
require("dotenv").config();
const bcrypt = require('bcryptjs');
const userModel = require('./models/user');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs')
const Post = require('./models/Post')



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
app.use("/uploads", express.static(__dirname + '/uploads'))


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
        const userOk = username === userDoc.username


        if (!passOk) {
            return res.status(400).json(' Username or Password dose not match please try again')
        }



        // if(!userOk) {
        //     return res.status(400).json('bad user credentials')
        // }


        // user logged in
        //  jwt.sign({ username, id: userDoc._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'}, (err, token) => {
        //         if (err) throw err;
        //         res.cookie('token', token).status(200).json({
        //             id: userDoc._id,
        //             username
        //         });
        //     })

        // const otherUsers = userModel.User.filter(person => person.username !== userDoc.username)
        // const currentUser = {... userDoc, refreshToken}
        const accessToken = jwt.sign({ username, id: userDoc._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s' })

        const refreshToken = jwt.sign({ username, id: userDoc._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

        res.cookie('jwtT', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).status(200).json({ success: true });

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

app.post('/post', upload.single('file'), async (req, res) => {

    const { originalname, path } = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)

    const { jwtT } = req.cookies
    jwt.verify(jwtT, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) throw err;
        const { title, summary, content } = req.body
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: decoded.id
        })
        res.json({ postDoc }).status(200).json({ success: true });
    })

})


app.get('/post', async (req, res) => {
    const posts = await Post.find().populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20)
    res.json(posts)
})


app.get('/post/:id', async (req, res) => {
    const { id } = req.params
    const postDoc = await Post.findById(id).populate('author', ['username'])
    res.json(postDoc)
})


app.put('/post', upload.single('file'), async (req, res) => {
    let newFile = null
    if (req.file) {
        const { originalname, path } = req.file
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        newFile = path + '.' + ext
        fs.renameSync(path, newPath)
    }

    const { jwtT } = req.cookies
    jwt.verify(jwtT, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {


        if (err) throw err;
        const { title, summary, content, id } = req.body
        const postDoc = await Post.findById(id)
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(decoded.id)

        if (!isAuthor) {
            return res.status(400).json('Opps!!, something went Wrong')
        }
        await postDoc.update({
            title,
            summary,
            content,
            cover: newFile ? newFile : postDoc.cover
        })

    })
    res.json('ok')

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
