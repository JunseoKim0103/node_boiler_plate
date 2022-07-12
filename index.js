const express = require('express') //express module을 가져온다.
const app = express() //함수로 새로운 express 앱을 만든다.
const port = 5000 //어떤 포트 번호를 백엔드 서버로 둘 것인가.
const bodyParser = require('body-parser');

//application/x-www-form-urlencoded 이런 데이터를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 형태의 데이터를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.json());


const { User } = require('./models/User');

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jskim0103:save0506rl@boiler-plate.iwegr.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => { //라우트 제작 완료
  //회원가입 할 때 필요한 정보들을 client 에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body)//instance 만들기
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  }) //몽고db method
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  //listen 하고 있으면, console을 출력한다.
})
