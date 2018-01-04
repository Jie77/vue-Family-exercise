const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./models/db')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const Port = 3000

app.listen(Port,function(){
    console.log("Server Listening on port"+Port)
})

app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next()
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
            let privateKey = 'jiangjie'//这里应该使用私钥用来签名，后来的验证要使用公钥
            let token = jwt.sign({user:usr},privateKey,{ expiresIn: '1h' })  //默认使用sha256
            res.json({
                success: true,
                message: token
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
//测试
app.post('/tdata',function(req,res){
    //console.log(req.body)
    user = req.body.user
    db.query("select * from student where sno='151801106' and sname='小卢'",[],function(err,rows){
        if (err){
            console.log(err)
            res.end()
        }else{
            res.json(rows)
        }
    })
    
})

app.post('/insertinfo',function(req,res,next){
    let token = req.headers.authorization
    jwt.verify(token,'jiangjie',function(err,decoded){
        if(err){
            res.end(err)
        }else{
            let sno,sname,ssex,sbrith
            sno = req.body.sno
            sname = req.body.sname
            ssex = req.body.ssex
            sbrith = req.body.sbrith
            db.query("insert into student values(?,?,?,?)",[sno,sname,ssex,sbrith],function(err,rows){
                if (err){
                    res.json({
                        success: false
                    })
                }else{
                    res.json({
                        success: true
                    })
                }
            })
        }
    })
})

app.post('/baseinfo',function(req,res,next){
    let token = req.headers.authorization
    jwt.verify(token,'jiangjie',function(err,decoded){
        if(err){
            res.end(err)
        }else{
            let sno,sname
            sno = req.body.sno
            sname = req.body.sname
            db.query("select * from student where sno=? and sname=?",[sno,sname],function(err,rows){
                if (err)  throw err;
                if (rows.length==0){
                    res.json({
                        success: false,
                        result: null
                    })
                }else{
                    res.json({
                        success: true,
                        result: rows
                    })
                }
            })
        }
    })
    
})

app.post('/recordGrade',function(req,res,next){
    let token = req.headers.authorization
    jwt.verify(token,'jiangjie',function(err,decoded){
        if(err){
            res.end(err)
        }else{
            let sno,cno,grade,sclass
            sno = req.body.sno
            cno = req.body.cno
            grade = parseInt(req.body.grade)
            sclass = req.body.sclass
            db.query("insert into sc values (?,?,?,'否',?)",[sno,cno,grade,sclass],function(err,rows){
                console.log(sno+"--"+cno+"--"+grade)
                if (err){
                    res.json({
                        success: false
                    })
                }else{
                    res.json({
                        success: true
                    })
                }
            })
        }
    })
    
})

app.post('/querygrade',function(req,res,next){
    let token = req.headers.authorization
    jwt.verify(token,'jiangjie',function(err,decoded){
        if(err){
            res.end(err)
        }else{
            let sno
            sno = req.body.sno
            console.log(sno)
            db.query("select student.sname,course.cname,grade,reexam from sc,course,student where sc.sno=? and sc.cno=course.cno and student.sno=?",[sno,sno],function(err,rows){
                if (err)  throw err;
                if (rows.length==0){
                    res.json({
                        success: false,
                        result: null
                    })
                }else{
                    db.query("select AVG(grade) as allAVG from sc where sno=?",[sno],function(err,rows1){
                        db.query("select AVG(grade) as muAVG from sc where sno=? and cno like 'MU%'",[sno],function(err,rows2){
                            res.json({
                                success: true,
                                result: rows,
                                allAVG: rows1[0].allAVG,
                                muAVG: rows2[0].muAVG
                            })
                        })
                    })
                    
                }
            })
        }
    })
    
})


app.post('/histeacher',function(req,res,next){
    let token = req.headers.authorization
    jwt.verify(token,'jiangjie',function(err,decoded){
        if(err){
            res.end(err)
        }else{
            let sno
            sno = req.body.sno
            db.query("select course.teachername,course.cname,sc.grade,sc.reexam from course,sc where sc.cno=course.cno and sc.sno=?",[sno],function(err,rows){
                if (err)  throw err;
                if (rows.length==0){
                    res.json({
                        success: false,
                        result: null
                    })
                }else{
                    res.json({
                        success: true,
                        result: rows
                    })
                }
            })
        }
    })
    
})

app.post('/dyingstu',function(req,res,next){
    let token = req.headers.authorization
    jwt.verify(token,'jiangjie',function(err,decoded){
        if(err){
            res.end(err)
        }else{
            db.query("select danger1.sno,danger1.sname,danger1.mu,danger2.notmu from danger1,danger2 where danger1.sno = danger2.sno;",[],function(err,rows){
                if (err)  throw err;
                if (rows.length==0){
                    res.json({
                        success: false,
                        result: null
                    })
                }else{
                    res.json({
                        success: true,
                        result: rows
                    })
                }
            })
        }
    })
    
})