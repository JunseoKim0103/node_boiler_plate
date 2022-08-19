// import './App.css';
import React from "react"; 
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element = {<LandingPage/>}/>
          {/* exact path: 정확히 경로가 맞아 떨어져야 실행된다는 의미 */}
          <Route path="/login" element = {<LoginPage/>}/>
          <Route path="/register" element = {<RegisterPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
