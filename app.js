/* npm install */
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
/* 밑의 4가지 공부를 하기 */
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')

/* 작성한 router file 불러오기 */
var router = require('./router/index')

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

/* 비동기로 동작 */
app.listen(3000, function(){
	console.log("start! express server on port 3000")
})


/*
middleware 영역
*/
/* image 받기 위해 이런식으로 static 처리하였음. */
app.use(express.static('public'))
/* bodyParser 는 GET, POST 를 받아온다 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) // 한글 처리를 위하여
/* main router 설정 : 다른 파일로 옮겨서 라우팅하려면 이런식으로 해야함 */
app.use(router)
/* ejs template engine set, ejs 말고도 pug, jade 등이 있다. */
app.set('view engine', 'ejs')

/* main.html page 로 연결 / 로 들어오든, /main 으로 들어오든 */
app.get('/', function(req, res){
	res.sendFile(__dirname + "/public/main.html")
})
