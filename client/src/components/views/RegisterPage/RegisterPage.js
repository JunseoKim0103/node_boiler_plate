import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth.js"

function RegisterPage(props) {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  
  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) =>{
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) =>{
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) =>{
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) =>{
    event.preventDefault(); //page refresh 막는다.
    //원래 해야되는 일들을 하는게 아니고 page 가 refresh 된다.
    // console.log("Email: ", Email)
    // console.log("Password: ", Password)
    // 서버로 보내고 싶은 값을 state 에 저장하고 있는다.

    //json 형태로 던져줄 준비를 한다.


    if (Password !== ConfirmPassword){//같을 경우에 진입
      return alert("비밀번호와 비밀번호 확인이 같아야 합니다.")
    }

    
    let body = {
      email: Email,
      password: Password,
      name: Name,
    }

    //dispatch 이용해서 action을 취한다.
    //만약 redux를 사용하지 않을 경우...
    // Axios.post("api/users/register", body)

    dispatch(registerUser(body))
    .then (response => {
      console.log(response.payload)
      if(response.payload.success){ //왜 여기는 success 인가?
        navigate('/login')
      }
      else{
        alert("Failed to sign up")
      }    
    })
  }

  return (
    <div style ={{display: "flex", justifyContent: "center",alignItems: "center", width:"100%", height: "100vh"}}>
      <form style = {{display: "flex", flexDirection: "column"}}
      onSubmit = {onSubmitHandler}>

        <label>Email</label>
        <input type = "email" value={Email} onChange = {onEmailHandler} />

        <label>Name</label>
        <input type = "text" value={Name} onChange = {onNameHandler} />

        <label>Password</label>
        <input type = "password" value={Password} onChange = {onPasswordHandler} />

        <label>Confirm Password</label>
        <input type = "password" value={ConfirmPassword} onChange = {onConfirmPasswordHandler} />

        <br/>
        <button type = "submit">
          Register
        </button>
      </form>
    </div>
  )
}

export default Auth(RegisterPage,false);
