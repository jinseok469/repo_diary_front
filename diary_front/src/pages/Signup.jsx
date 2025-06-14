import "./Signup.css";
import Button from "../components/Button";
import { useState, useRef } from "react";
import axios from "axios";
import { replace, useNavigate } from "react-router-dom";
const Signup = () => {
  const nav = useNavigate();
  const [state, setState] = useState({
    name: "",
    userId: "",
    password: "",
    passwordck: "",
  });
  const ref = useRef({
    name: null,
    userId: null,
    password: null,
    passwordck: null,
  });
  const [isError, setIsError] = useState(false);

  const onsubmit = async () => {
    const newItem = {
      name: state.name,
      userId: state.userId,
      password: state.password,
    };
    for (const key in state) {
      if (!state[key]) {
        ref.current[key].focus();
        return;
      }
    }

    if (state.password !== state.passwordck) {
      ref.current.passwordck.focus();
      setIsError(true);
      return;
    } else {
      setIsError(false);
      try {
        const res = await axios.post("/api/insert", newItem);
        alert(res.data);
        nav("/login", { replace: true });
      } catch (err) {
        alert(err.response.data);
        console.error(err.response.data);
      }
    }
  };

  return (
    <div className="Signup">
      <div className="Signup_header">
        <Button text={"< 뒤로가기"} onClick={() => nav("/login")}></Button>
      </div>
      <div className="Signup_main">
        <h2>회원가입</h2>
      </div>
      <div className="Signup_input">
        <input
          type="text"
          placeholder="사용자 이름 (최대 12자)"
          maxLength={12}
          onChange={(e) => setState({ ...state, name: e.target.value })}
          ref={(el) => (ref.current.name = el)}
        ></input>
        <input
          type="text"
          placeholder="아이디 (최대 12자)"
          maxLength={12}
          onChange={(e) => setState({ ...state, userId: e.target.value })}
          ref={(el) => {
            return (ref.current.userId = el);
          }}
        ></input>
        <input
          type="password"
          placeholder="비밀번호"
          onChange={(e) => setState({ ...state, password: e.target.value })}
          ref={(el) => {
            return (ref.current.password = el);
          }}
        ></input>
        <input
          type="password"
          className={`passwordck ${isError ? "error" : ""}`}
          ref={(el) => {
            return (ref.current.passwordck = el);
          }}
          placeholder="비밀번호 확인"
          onChange={(e) => setState({ ...state, passwordck: e.target.value })}
        ></input>

        <div className={`errorMsg ${isError ? "true" : ""}`}>
          비밀번호가 일치하지 않습니다.
        </div>
      </div>
      <div className="Signup_footer">
        <Button onClick={onsubmit} text={"회원가입"}></Button>
      </div>
    </div>
  );
};

export default Signup;
