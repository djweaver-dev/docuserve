const fs = require('fs')
const path = require('path')
const express = require('express')
const multer = require('multer')

const multipart = multer()
const app = express()

const port = process.env.PORT || 3001
const publicDir = path.join(process.cwd(), '/public/')
const compDir = path.join(process.cwd(), '/components/')
const dataDir = path.join(process.cwd(), '/data/')
const templateDir = path.join(process.cwd(), '/templates/')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(multipart.array())


app.post('/login', (req, res, next) => {
    fs.readFile(dataDir+"users.json", (error, data)=>{
        if(error) throw error;
        const username = req.body.username;
        const password = req.body.password;  
        const users = JSON.parse(data);
        if(users[username]) {
            if(users[username].password === password){
                fs.readFile(templateDir + 'welcome', "utf-8", (error, data) => {
                    if(error) throw error;
                    const html = (data.split('${username}').join(`${username}`)).toString();
                    res.json({auth: true, html});
                })
            } else {
                res.send('<h1>Incorrect credentials</h1>')
            }
        } else {
            res.send(`<h1>User: ${username} does not exist in the database.</h1>`)
        }
    })
})

// app.get('*', (req, res, next) => {
//     res.sendFile(publicDir+'index.html')
// })

app.listen(port, () => {
    console.log('Server listening at port '+port)
})