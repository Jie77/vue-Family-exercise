const mysql = require('mysql')

const opinion = {
    host: '127.0.0.1',
    user: 'root',
    password: '11111',
    port: '3306',
    database: 'stu_sys'
}

function Query(payload, param, callback){
    let connection = mysql.createConnection(opinion)
    connection.connect(function(err){
        if (err){
            callback("数据库连接错误",null)
            return;
        }
        console.log("数据库打开成功")
        connection.query(payload, param,function(err, res){
            if (err){
                callback("数据库查询错误",null)
                return;
            }
            callback(null,res)
            connection.end()
        })
    })
    connection.on('end',function(err){
        if(err){
            console.log("监听数据库关闭错误")
        }else{
            console.log("数据库关闭成功")
        }
    })
}

exports.query = Query

