// import { Axios } from 'axios';
import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth.js"



function LoginPage(props) {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) =>{
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) =>{
    event.preventDefault(); //page refresh 막는다.
    //원래 해야되는 일들을 하는게 아니고 page 가 refresh 된다.
    // console.log("Email: ", Email)
    // console.log("Password: ", Password)
    // 서버로 보내고 싶은 값을 state 에 저장하고 있는다.

    //json 형태로 던져줄 준비를 한다.
    let body = {
      email: Email,
      password: Password
    }

    //dispatch 이용해서 action을 취한다.


    dispatch(loginUser(body))
    .then (response => {
      console.log(response.payload.loginSuccess)
      if(response.payload.loginSuccess){
        navigate('/')
      }
      else{
        alert("error")
      }    
    })
  }



  return (
    <div style ={{display: "flex", justifyContent: "center",alignItems: "center", width:"100%", height: "100vh"}}>
      <form style = {{display: "flex", flexDirection: "column"}}
      onSubmit = {onSubmitHandler}>
        <label>Email</label>
        <input type = "email" value={Email} onChange = {onEmailHandler} />
        <label>Password</label>
        <input type = "password" value={Password} onChange = {onPasswordHandler} />

        <br/>
        <button type = "submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Auth(LoginPage, false);
