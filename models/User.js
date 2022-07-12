const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //10 자리로 암호화
//salt 를 이용해서 비밀번호를 암호화 한다.
const jwt = require('jsonwebtoken');
// 이걸 이용해서 토큰을 만든다.
const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //space bar 제거해주는 역할
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50

    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token:{
        type: String
    },
    tokenExp:{
        type: Number
    }


})
//save 전에 무엇인가를 하겠다. -> mongoose 의 영향
// 다 끝나면 다시 index.js 내에 있는 route로 간다.
userSchema.pre('save' , function(next){
    var user = this;
    // console.log(user.password);

    if(user.isModified('password')){ //비밀번호가 바뀔 때만, 다시 암호화를 진행한다.
        bcrypt.genSalt(saltRounds, function(err, salt) { //salt 를 만든다. call back function을 준다.
            if (err) return next(err); // user.save 로 바로 들어간다. -> next를 하면 거기로 간다.
    
            bcrypt.hash(user.password, salt, function(err, hash) { //myPlaintextPassword는 내가 원래 가지고 있는 password, hash 는 암호화된 비밀번호    
                if (err) return next(err);
                user.password = hash;
                next() //user.save로 돌아간다.
            });
        });

    }
    else{
        next();
    }
});



userSchema.methods.comparePassword = function(plainPassword, cb){
    // plainPassword !!save0506rl 암호화된 비밀번호  $2b$10$3Iq8WPufbBQi3BtBLLI/ruLyoPHCNIF4ACxGjQeILa4IheWvePGYC
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch) //여기서 isMatch 는 true
    })
}   

userSchema.methods.generateToken = function(cb){
    //jsonwebtoken 을 이용해서 토큰 생성
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken') // ObjectID 형태의 id를 24바이트의 hex 문자열로 바꾸어 리턴해주는 함수입니다.
    // user._id + 'secretToken' = token -> 이를 통해서 누구인지를 알 수 있다.
    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    });

}


const User = mongoose.model('User', userSchema); //스키마를 통해서 model에 넣어줘야 table 로 사용 가능

module.exports = { User } //다른 곳에서도 사용이 가능하도록