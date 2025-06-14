import "./Satistics.css";
import Button from "../components/Button";
import { getEmotionImage } from "../util/get-emotion-image";
import { emotionList } from "../util/constants";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Satistics = () => {
  const [emotionId, setEmotionId] = useState(1);
  const [percent, setPercent] = useState();
  const [satisticsAi, setSatisticsAi] = useState("");
  const [emotionStats, setEmotionStats] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  });

  const emotionItem = emotionList.find(
    (item) => String(item.emotionId) === String(emotionId)
  );
  const nav = useNavigate();
  const location = useLocation();
  if (
    !location?.state?.monthlyData ||
    location?.state?.monthlyData.length === 0
  ) {
    alert("이번달 일기가 부족합니다");
    return <Navigate to="/" replace></Navigate>;
  }
  useEffect(() => {
    const fetchStat = async () => {
      if (
        location?.state?.monthlyData &&
        location?.state?.monthlyData.length > 0
      ) {
        try {
          const res = await axios.post(
            "/api/satistics",
            location?.state?.monthlyData
          );

          const stats = {
            1: res.data[1] || 0,
            2: res.data[2] || 0,
            3: res.data[3] || 0,
            4: res.data[4] || 0,
            5: res.data[5] || 0,
          };
          setEmotionStats(stats);
        } catch (err) {
          console.error("감정 통계 불러오기 실패", err);
        }
      }
    };
    fetchStat();
  }, [location]);

  useEffect(() => {
    const getAi = async () => {
      if (
        location?.state?.monthlyData &&
        location?.state?.monthlyData.length > 0
      ) {
        try {
          const res = await axios.post("/api/ai", location?.state?.monthlyData);
          setSatisticsAi(res.data);
        } catch (err) {
          console.error("감정 ai 불러오기 실패", err);
        }
      }
      console.log("@@@@@@@@@@@@");
    };
    getAi();
  }, [location?.state?.monthlyData]);

  return (
    <div className="Satistics">
      <div className="button_back">
        <Button onClick={() => nav("/")} text={"< 뒤로가기"}></Button>
      </div>
      <div className="Satistics_header">
        <h2>{location.state.pivotDate.getMonth() + 1}월의 평균 감정</h2>
      </div>

      <div className="Satistics_side_emotions">
        {emotionList.map((emo) => {
          const percent = emotionStats[emo.emotionId] || 0;
          return (
            <div key={emo.emotionId}>
              <div className={`emotion_box emotion_box_${emo.emotionId}`}>
                <img src={getEmotionImage(emo.emotionId)} alt="" />
                <div className="emotion_box_name">{emo.emotionName}</div>
              </div>
              <div className="emotion_box_text">{percent}%</div>
            </div>
          );
        })}
      </div>

      <div className="Satistics_text">
        <p>{satisticsAi}</p>
      </div>
    </div>
  );
};
export default Satistics;
