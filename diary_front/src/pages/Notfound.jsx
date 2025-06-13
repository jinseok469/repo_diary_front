import "./Notfound.css";
import { replace, useNavigate } from "react-router-dom";
import { getEmotionImage } from "../util/get-emotion-image";
import Button from "../components/Button";
const Notfound = () => {
  const nav = useNavigate();
  return (
    <div className="Notfound">
      <div className="img_section">
        <h1>잘못된 요청 페이지입니다.</h1>
        <img src={getEmotionImage(5)} alt="" />
        <Button
          text={"홈 화면으로 돌아가기"}
          onClick={() => {
            return nav("/", { replace: true });
          }}
        ></Button>
      </div>
    </div>
  );
};

export default Notfound;
