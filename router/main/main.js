/* npm install : express 객체 만들기 */
var express = require('express')
var router = express.Router() // express 의 router 메소드
var path = require('path')

router.get('/', function(req, res){
	console.log('main js loaded', req.user)
	var id = req.user
	// res.sendFile(path.join(__dirname, "../../public/main.html"))
	res.render('main.ejs', {'id' : id})
})

module.exports = router // 다른 파일에서도 이 router 설정을 쓸 수 있게 된다.(다른 router 와 중복 가능)