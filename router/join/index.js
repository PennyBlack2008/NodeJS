/* npm install */
var express = require('express')
var router = express.Router()
var path = require('path')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

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
	res.render('join.ejs')
})

/* 전략 설정 */
passport.use('local-join', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'passwd',
  passReqToCallback: true
}, function(req, email, passwd, done) {
	console.log('local-join callback called')
}
))

router.post('/', passport.authenticate('local-join', {
	/* call back 함수가 구현되어야 한다 */
	successRedirect: '/main',
	failureRedirect: '/join',
	failureFlash: true
}))

// router.post('/', function(req, res){
// 	var body = req.body
// 	var email = body.email
// 	var name = body.name
// 	var passwd = body.passwd

// 	var sql = {email : email, name : name, pw : passwd}
// 	var query = connection.query('INSERT INTO user set ?', sql, function(err, rows){
// 		if (err) throw err
// 		else res.render('welcome.ejs', {'name' : name, 'id' : rows.insertId})
// 	})
// })

module.exports = router // 다른 파일에서도 이 router 설정을 쓸 수 있게 된다.(다른 router 와 중복 가능)
