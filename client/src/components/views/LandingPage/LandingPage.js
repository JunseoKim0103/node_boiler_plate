//rfce

import React,{useEffect, } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth.js"


function LandingPage(props) {

  const navigate = useNavigate();

  // 화면이 열리자마자 요청을 보낼 수 있도록 
  useEffect(() => {
    axios("/api/hello") //이 end point 를 서버로 보냄
    .then(response => console.log(response.data)) // response 결과의 data를 출력해서 보내줘
  }, [])

  const onClickHandler = () => {
    axios.get("/api/users/logout")
    .then(response => {
      if (response.data.success) {
        navigate("/login")
      }
      else{
        alert("로그아웃 하는데 실패 했습니다.")
      }
    })
  };

  return (
    <div style ={{display: "flex", justifyContent: "center",alignItems: "center", width:"100%", height: "100vh"}}>
      <h2>시작 페이지</h2>
      <button onClick = {onClickHandler}>
        logout
      </button>
    </div>
  )
}

export default Auth(LandingPage,null);
