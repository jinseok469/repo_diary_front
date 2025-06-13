import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import MainApp from "./MainApp";
import Signup from "./pages/Signup";
const App = () => {
  const nav = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const possiblePage = ["/login", "/signup"];

    // 허용 페이지가 아닐때만 검사
    if (!possiblePage.includes(location.pathname)) {
      if (!token) {
        nav("/login", { replace: true });
        return;
      }
    }

    if (location.pathname == "/login" && token) {
      nav("/", { replace: true });
    }
  }, [location]);

  return (
    <div className="loginPage">
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/*" element={<MainApp></MainApp>}></Route>
      </Routes>
    </div>
  );
};

export default App;
