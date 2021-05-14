/* npm install : express 객체 만들기 */
var express = require('express')
var app = express()
var router = express.Router() // express 의 router 메소드
var path = require('path')

router.get('/', function(req, res){
	res.sendFile(path.join(__dirname, "../public/main.html"))
})

module.exports = router // 다른 파일에서도 router 를 쓸수 있게 된다.