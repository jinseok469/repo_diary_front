import EmotionItem from "../components/EmotionItem";
import { emotionList } from "../util/constants";
import { useState, useRef } from "react";
import Button from "../components/Button";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [state, setState] = useState(1);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const idRef = useRef();
  const pwRef = useRef();
  const nav = useNavigate();

  const handleLogin = () => {
    if (!userId) {
      idRef.current.focus();
      return;
    }
    if (!password) {
      pwRef.current.focus();
      return;
    }

    // 로그인 버튼 눌렀을 때 호출
    axios
      .post("http://localhost:8080/api/login", { userId, password })
      .then((res) => {
        localStorage.setItem("token", res.data);
        nav("/");
        // 로그인 성공 처리 (토큰 저장 등)
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.error("로그인 실패");
      });
  };

  const onChangeState = (value) => {
    return setState(value);
  };

  return (
    <div className="Login">
      <div className="SignupButton">
        <Button
          onClick={() => {
            nav("/signup");
          }}
          text={"회원가입"}
          type={"SIGNUP"}
        ></Button>
      </div>
      <h1>감정 일기장</h1>
      <div className="emotionList">
        {emotionList.map((item) => {
          return (
            <EmotionItem
              onClick={() => {
                onChangeState(item.emotionId);
              }}
              isSelected={item.emotionId === state}
              key={item.emotionId}
              {...item}
            ></EmotionItem>
          );
        })}
      </div>
      <h2>로그인</h2>
      <div className="LoginId">
        <input
          ref={idRef}
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
          type="text"
          placeholder="아이디"
        ></input>
      </div>
      <div className="LoginPassword">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          ref={pwRef}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="패스워드"
        ></input>
      </div>
      <div className="LoginButton">
        <Button onClick={handleLogin} text={"로그인"}></Button>
      </div>
    </div>
  );
};

export default Login;
