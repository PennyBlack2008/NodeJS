/* npm install */
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var main = require('./router/main')

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

/* main router 설정 : 다른 파일로 옮겨서 라우팅하려면 이런식으로 해야함 */
app.use('/main', main)
/* image 받기 위해 이런식으로 처리하였음. */
app.use(express.static('public'))
/* bodyParser */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) // 한글 처리를 위하여
/* ejs template engine set, ejs 말고도 pug, jade 등이 있다. */
app.set('view engine', 'ejs')

/* main.html page 로 연결 / 로 들어오든, /main 으로 들어오든 */
app.get('/', function(req, res){
	res.sendFile(__dirname + "/public/main.html")
})


/* email 입력 후, 연결 */
app.post('/email_post', function(req, res){
	console.log(req.body.email)
	res.render('email.ejs', {'email' : req.body.email})
})
app.post('/ajax_send_email', function(req, res){
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