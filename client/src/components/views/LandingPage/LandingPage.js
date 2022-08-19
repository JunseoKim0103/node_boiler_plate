//rfce

import React,{useEffect} from 'react';
import axios from "axios";

function LandingPage() {

  // 화면이 열리자마자 요청을 보낼 수 있도록 
  useEffect(() => {
    axios("/api/hello") //이 end point 를 서버로 보냄
    .then(response => console.log(response.data)) // response 결과의 data를 출력해서 보내줘
  }, [])
  return (
    <div>
      LandingPage
    </div>
  )
}

export default LandingPage
