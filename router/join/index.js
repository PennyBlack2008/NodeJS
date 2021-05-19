/* npm install */
var express = require('express')
var app = express()
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
	var msg
	var errMsg = req.flash('error') // 에러나면, app.js 의 app.use(router) 를 가장 나중에 실행하도록 조정
	if (errMsg) msg = errMsg
	res.render('join.ejs', {'message' : msg})
})

/* 전략 설정 */
// passport.serialize 에서는 passport.use 의 call back 함수의 done 을 받아 쓸 수 있다.
passport.serializeUser(function(user, done){
	console.log('passport session save : ', user.id)
	done(null, user.id)
})
// session id 를 뽑아 DB 조회 후 페이지에 전달
passport.deserializeUser(function(id, done){
	console.log('passport session get id : ', id)
	done(null, id)
})

passport.use('local-join', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'passwd',
  passReqToCallback: true
}, function(req, email, passwd, done) { // done 은 serialize 메소드 실행해줄 것을 찾음
	var query = connection.query('select * from user where email=?', [email], function(err, rows){
		if (err) return done(err)
		if (rows.length) {
			console.log('existed user')
			return done(null, false, {message : 'your email is already used'})
		} else {
			var sql = {email : email, pw : passwd}
			var query = connection.query('INSERT INTO user SET ?', sql, function(err, rows){
				if (err) throw err
				return done(null, {'email' : email, 'id' : rows.insertId})
			})
		}
	})
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
