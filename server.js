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

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(multipart.array())

app.get('/', (req, res, next) => {
    console.log('root hit')
})

app.get('/hello', (req, res, next) => {
    console.log('hello')
})
require('express-route-log')(app);
app.get('/query/', (req, res, next) => {
    let term, nav;
    if(req.query.term) term = req.query.term;
    if(req.query.nav) nav = req.query.nav;

    fs.readFile(dataDir + 'users.json', (error, data) => {
        if(error) throw error;
        const db = JSON.parse(data);
        const dbArr = Object.keys(db);

        if(nav) {
            const refIndex = parseInt(req.query.refIndex, 10);
            if(nav === 'next') {
                console.log(req.query)
                if(refIndex < dbArr.length - 1) {
                    res.json({
                        [dbArr[refIndex+1]] : db[dbArr[refIndex+1]],
                        index: refIndex+1
                    })  
                }   
            }
            if(nav === 'prev') {
                console.log(req.query)
                if(refIndex > 0) {
                    res.json({
                        [dbArr[refIndex-1]] : db[dbArr[refIndex-1]],
                        index: refIndex-1
                    })
                }
            }
        }

        if(term) {
            if(db[term]) {
                let index;
                for(let i = 0; i < dbArr.length; i++){
                    if(dbArr[i] === term) index = i;
                }
                res.json({ 
                    [term]: db[term],
                    index  
                })
            } else { 
                res.json({ html: '<h1>Record Not Found</h1>' })
            }
        }
    
    })
})

app.post('/login', (req, res, next) => {
    fs.readFile(dataDir+"users.json", (error, data)=>{
        if(error) throw error;
        const username = req.body.username;
        const password = req.body.password;  
        const users = JSON.parse(data);
        if(users[username]) {
            if(users[username].password === password){
                fs.readFile(compDir + 'welcome', "utf-8", (error, data) => {
                    if(error) throw error;
                    const greet = (data.split('${username}').join(`${username}`)).toString();
                    res.json({auth: true, greet});
                })
            } else {
                res.json({auth: false})
            }
        } else {
            res.json({auth: false})
        }
    })
})

// app.get('*', (req, res, next) => {
//     res.sendFile(publicDir+'index.html')
// })

app.listen(port, () => {
    console.log('Server listening at port '+port)
})