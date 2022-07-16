const {User} = require('../models/User');

let auth = (req, res, next) => {


    //여기 안에 인증 처리들을 처리한다.


    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth; //쿠키에서 토큰 가져오기


    //토큰을 복호화 한다음, user를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if(!user) return res.json({isAuth: false, error: true}) //유저가 없으면

        //유저가 있다고 하면,

        // reqeust 에 token을 넣는 이유는, index.js 에서 받을 때 request에 토큰과 user을 넣음에 따라서, index.js 에서 사용할 수 있게 된다.
        req.token = token;
        req.user = user;
        next(); //미들 웨어에서 갇히지 않고 다음 순차로 넘어갈 수 있게.

    })

    //user 가 있으면 인증 성공!

    //user 가 없으면 인증 실패!

}

module.exports = {auth}; 