import "./MainApp.css";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Notfound from "./pages/Notfound";
import Edit from "./pages/Edit";
import Satistics from "./pages/Satistics";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { getEmotionImage } from "./util/get-emotion-image";
import {
  useReducer,
  useRef,
  createContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import useDate from "./hooks/useDate";
import { jwtDecode } from "jwt-decode";

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function MainApp() {
  const [data, setData] = useState([]);
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      nav("/login");
      return;
    }
  }, [token]);

  useEffect(() => {
    try {
      const decode = jwtDecode(token);
      const user_id = decode.sub;
      axios
        .get(`http://localhost:8080/api/diary?id=${user_id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.error("일기 불러오기 실패:", err);
        });
    } catch (err) {
      localStorage.removeItem("token");
      nav("/login");
    }
  }, [nav, token]);
  // 새로운 일기 추가
  const onCreate = async (createdDate, emotionId, content) => {
    const decode = jwtDecode(token);
    const user_id = decode.sub;

    const newDate = useDate(new Date(createdDate));
    const newItem = {
      createdDate: newDate,
      emotionId,
      content,
      user_id,
    };
    try {
      console.log(newItem);
      const res = await axios.post(
        "http://localhost:8080/api/diary/new",
        newItem
      );
      setData((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error("일기 생성 실패");
    }
  };
  // 기존 일기 수정
  const onUpdate = async (id, createdDate, emotionId, content) => {
    const newDate = useDate(new Date(createdDate));
    const newItem = {
      id,
      createdDate: newDate,
      emotionId,
      content,
    };
    try {
      const res = await axios.put(
        "http://localhost:8080/api/diary/edit",
        newItem
      );
      setData((prev) =>
        prev.map((item) => {
          return String(item.id) === String(id)
            ? { id, createdDate, emotionId, content }
            : item;
        })
      );
    } catch (err) {
      console.error("일기 수정 실패");
    }
  };
  // 기존 일기 삭제
  const onDelete = async (id) => {
    const newItem = {
      id,
      delNy: 1,
    };
    if (!id) {
      return;
    }
    try {
      const res = await axios.put(
        "http://localhost:8080/api/diary/uele",
        newItem
      );

      setData((prev) =>
        prev.filter((item) => {
          return String(item.id) !== String(id);
        })
      );
    } catch (err) {
      console.error("일기 삭제를 실패했습니다");
    }
  };

  const DiaryDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={DiaryDispatch}>
          <Routes>
            <Route path="/edit/:id" element={<Edit></Edit>}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/diary/:id" element={<Diary />}></Route>
            <Route path="/new" element={<New />}></Route>
            <Route path="/Satistics" element={<Satistics />}></Route>
            <Route path="*" element={<Notfound />}></Route>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default MainApp;
