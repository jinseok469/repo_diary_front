import { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { DiaryStateContext } from "../MainApp";
import { jwtDecode } from "jwt-decode";
import "./Home.css";
import { useNavigate } from "react-router-dom";
const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();
  return data.filter((item) => {
    const createdDate = new Date(item.createdDate).getTime();
    return beginTime <= createdDate && createdDate <= endTime;
  });
};
const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const monthlyData = getMonthlyData(pivotDate, data);
  const [name, setName] = useState("");
  const nav = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    // localStorage.setItem("token", "");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setName(decoded.name);
      } catch (error) {
        console.error("Invalid token");
        setToken(null);
        localStorage.removeItem("token");
        nav("/login", { replace: true });
      }
    } else {
      nav("/login", { replace: true });
    }
  }, [token]);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div className="Home">
      <div className="User">
        <section className="Home_satistics">
          <button
            className="button_satistics"
            onClick={() =>
              nav("/satistics", {
                state: {
                  monthlyData,
                  pivotDate,
                },
              })
            }
          >
            이달의 감정 분석
          </button>
        </section>
        <section className="Home_name">
          <h2>{name}의 일기장</h2>
        </section>
        <section className="Home_logout">
          <button
            onClick={() => {
              localStorage.clear();
              nav("/", { replace: true });
            }}
          >
            log out
          </button>
        </section>
      </div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"}></Button>}
        rightChild={<Button onClick={onIncreaseMonth} text={">"}></Button>}
      ></Header>
      <DiaryList data={monthlyData}></DiaryList>
    </div>
  );
};

export default Home;
