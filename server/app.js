const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./models/db')
const crypto = require('crypto')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const Port = 3000

app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next()
})

app.listen(Port,function(){
    console.log("Server Listening on port"+Port)
})

app.post('/login',function(req,res){
    console.log(req.body)
    let usr = req.body.user
    let hash = crypto.createHash("sha256")
    let pwd = hash.update(req.body.pwd).digest("hex")
    db.query("select * from admin where usr=? and pwd=?",[usr,pwd],function(err,rows){
        if (err)  throw err
        if (rows.length == 0){
            res.json({
                success: false,
                message: "用户名或密码错误"
            })
        }else{
            res.json({
                success: true,
                message: "I am a token"
            })
        }
    })
    
})

app.post('/reg',function(req,res){
    console.log(req.body)
    let usr = req.body.user
    let hash = crypto.createHash("sha256")
    let pwd = hash.update(req.body.pwd).digest("hex")
    db.query("insert into admin values(?,?)",[usr,pwd],function(err,rows){
        if (err)  throw err
        console.log(rows)
    })
    res.end()
    
})

app.post('/tdata',function(req,res){
    //console.log(req.body)
    user = req.body.user
    let t = [{
        date: '2017-12-12',
        name: user,
        address: '西电'
      }, {
        date: '2017-12-12',
        name: user,
        address: '西电'
      }, {
        date: '2017-12-12',
        name: user,
        address: '西电'
      }, {
        date: '2017-12-12',
        name: user,
        address: '西电'
      }]
    res.json(t)
})