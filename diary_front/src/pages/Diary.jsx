import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import useDate from "../hooks/useDate";
const Diary = () => {
  const params = useParams();
  const nav = useNavigate();

  const curDiaryItem = useDiary(params.id);
  //useDiary 같은 useEffect 는 렌더링된 이후이기때문에 초기값은 undefined 이다 때문에 if 문 으로 스피너 필요
  if (!curDiaryItem) {
    return <div>데이터 로딩중..</div>;
  }

  const { createdDate, emotionId, content } = curDiaryItem;

  const title = useDate(new Date(createdDate));
  return (
    <div className="Diary">
      <Header
        title={`${title} 기록`}
        leftChild={
          <Button
            onClick={() => {
              return nav(-1);
            }}
            text={"< 뒤로가기"}
          ></Button>
        }
        rightChild={
          <Button
            onClick={() => {
              return nav(`/edit/${params.id}`);
            }}
            text={"수정하기"}
          ></Button>
        }
      ></Header>
      <Viewer emotionId={emotionId} content={content}></Viewer>
    </div>
  );
};

export default Diary;
