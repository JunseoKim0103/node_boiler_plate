const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema) //스키마를 통해서 model에 넣어줘야 table 로 사용 가능

module.exports = { User } //다른 곳에서도 사용이 가능하도록