/* npm install : express 객체 만들기 */
var express = require('express')
var router = express.Router() // express 의 router 메소드
var path = require('path')

// main page 는 Login 이 될 때만(즉 세션 정보가 있을 때만) 접근이 가능하게 하자.
router.get('/', function(req, res){
	console.log('main js loaded', req.user)
	var id = req.user
	if (!id) res.render('login.ejs')
	// res.sendFile(path.join(__dirname, "../../public/main.html"))
	res.render('main.ejs', {'id' : id})
})

module.exports = router // 다른 파일에서도 이 router 설정을 쓸 수 있게 된다.(다른 router 와 중복 가능)