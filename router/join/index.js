/* npm install */
var express = require('express')
var router = express.Router()
var path = require('path')

/* MySQL 연동 express 페이지에서 mysql 연동 메뉴얼 확인 */
var mysql = require('mysql')
var connection = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : 'asdf1234',
	database : 'jsman'
})
connection.connect()

router.get('/', function(req, res){
	console.log('get join url')
	res.sendFile(path.join(__dirname, '../../public/join.html'))
})

router.post('/', function(req, res){
	var body = req.body
	var email = body.email
	var name = body.name
	var passwd = body.password

	var query = connection.query('insert into user (email,name,pw) values ("' +
					email + '", "' + name + '", "' + passwd + '")', function(err, rows){
						if (err) {throw err;}
						console.log("ok db insert")})
})

module.exports = router // 다른 파일에서도 이 router 설정을 쓸 수 있게 된다.(다른 router 와 중복 가능)
