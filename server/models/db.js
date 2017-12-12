const pool = require('./pool.js')

exports.query = query


function query(payload, param, callback){
    pool.getConnection(function(err,connection){
        if(err){
            console.log("数据库连接错误")
            callback("数据库连接错误",null)
            return;
        }
        console.log("连接创建成功")
        connection.query(payload, param,function(err, res, fields){
            if (err){
                callback("数据库查询错误",null)
                return;
            }
            callback(null,res,fields)
            connection.release()
        })  
    })
    // pool.on('release', function (connection) {
    //     console.log('连接 %d 注销', connection.threadId);
    // });
}





// pool.getConnection(function(err,connection){
//     connection.query('select * from admin',function(err,res){
//         console.log(res)
//         connection.release()
//         if (err) throw err
//         pool.end()
//     })
// })
