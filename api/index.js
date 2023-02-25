const express = require('express')
const cors = require('cors')

const app = express();
const port = 4000
app.use(cors())
app.use(express.json())

app.post('/register', (req, res) => {
    const  {userName, password} = req.body
    res.json({requestData:{userName, password}})
})

// app.get('/register', (req, res) => {
//     res.json('test server')
// })


app.listen(port, console.log(`server is listening on port ${port}....`))