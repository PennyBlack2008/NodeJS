/* npm install : express 객체 만들기 */
var express = require('express')
var app = express()
var router = express.Router() // express 의 router 메소드
var path = require('path')

/* 관리할 router 들 */
var main = require('./main/main')
var email = require('./email/email')
var join = require('./join/index')
var login = require('./login/index')

/* url routing */
router.get('/', function(req, res){
	res.sendFile(path.join(__dirname, "../public/main.html"))
})
router.use('/main', main) // REVIEW : bodyParser 이후에 위치(처리)해야함. 왜?
router.use('/email', email) // REVIEW : bodyParser 이후에 위치(처리)해야함. 왜?
router.use('/join', join) // REVIEW : bodyParser 이후에 위치(처리)해야함. 왜?
router.use('/login', login)

module.exports = router