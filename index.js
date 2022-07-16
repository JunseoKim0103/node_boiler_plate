const express = require('express') //express module을 가져온다.
const app = express() //함수로 새로운 express 앱을 만든다.
const port = 5000 //어떤 포트 번호를 백엔드 서버로 둘 것인가.
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config  = require('./config/key');

//application/x-www-form-urlencoded 이런 데이터를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 형태의 데이터를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.json());

//cookie-parser을 사용하기
app.use(cookieParser());


const { User } = require('./models/User');
const { auth } = require('./middleware/auth');

const mongoose = require('mongoose');
const { application } = require('express');
const { json } = require('body-parser');
// mongoose.connect('mongodb+srv://jskim0103:save0506rl@boiler-plate.iwegr.mongodb.net/?retryWrites=true&w=majority', 
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/users/register', (req, res) => { //라우트 제작 완료
  //회원가입 할 때 필요한 정보들을 client 에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body)//instance 만들기, request 에서 넘오는 정보를 가지고 User db 모델을 만든다.
  //save 전에 비밀번호를 암호화해야 한다. -> User.js 로 가서 userschema.pre method 사용
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  }) //몽고db method
})


app.post('/api/users/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾기
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    //요청한 email이 데이터 베이스에 있다면 비밀번호가 일치하는지를 확인

    user.comparePassword(req.body.password, (err, isMatch) =>{
      if(!isMatch) 
        return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."});

      //비밀번호까지 같다면 token을 생성
      user.generateToken((err, user) => {
        if (err) 
          return res.status(400).send(err); //에러 메시지를 client로 보내준다.

        //토큰을 저장한다. 어디에?? -> 쿠키, 로컬 스토리지, 세션 등등... -> 여기서는 쿠키에 진행
        res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id});
      })
    })
  })
})

//맞는지 확인을 해봐야 할듯?
//auth는 로그인 만큼 복잡하다.
//middleware에서 오류가 있다고 하면, error 를 발생해서 탈출하게 된다. -> 여기까지 오지 못한다.
app.get("/api/users/auth", auth ,(req, res) => { //auth 라는 middleware를 설치한다.
    //여기까지 미들웨어를 통과해 왔다는 이야기는 authentication이 True라는 이야기이다.
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role == 0 ? false : true, //0이면 false 아니면 true -> false 일때 관리자가 아니다.
      //지금 상황은 role이 0이면 일반 유져이고 나머지이면, 관리자이다.
      isAuth:true,
      email: req.user.email,
      name : req.user.name,
      lastname: req.user.lastname,
      role : req.user.role,
      image: req.user.image
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  //listen 하고 있으면, console을 출력한다.
})