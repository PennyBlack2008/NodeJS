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

/*
** from.html 에서 이메일 입력 후, 연결
1. email 입력 후, submit 하면,
2. email/form 으로 연결되어
3. email/form page 를 email.ejs 로 꾸며준다.
*/
router.post('/form', function(req, res){
	console.log(req.body.email)
	res.render('emailw.ejs', {'email' : req.body.email})
})
router.post('/ajax', function(req, res){
	var email = req.body.email;
	var responseData = {'result' : 'ok', 'email' : req.body.email}
	/* MySQL 에 들어간 query 문 */
	var query = connection.query('select name from user where email="' + email + '"', function(err, rows){
		if (err) throw err;
		if (rows[0]){
			responseData.result = "ok"
			responseData.name = rows[0].name
		} else {
			responseData.result = "none"
			responseData.name = "" // 여기에 rows[0].name 을 조회하면 터진다.
		}
		/* Check validation about input value : insert db*/
		res.json(responseData)
	})
})

module.exports = router // 다른 파일에서도 이 router 설정을 쓸 수 있게 된다.(다른 router 와 중복 가능)