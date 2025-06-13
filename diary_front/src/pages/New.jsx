import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../MainApp";
const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  const stepBack = () => {
    nav(-1);
  };

  const onSubmit = (input) => {
    onCreate(input.createdDate, input.emotionId, input.content);
    nav("/", { replace: true });
  };
  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button onClick={stepBack} text={"< 뒤로가기"}></Button>}
      ></Header>
      <Editor onSubmit={onSubmit}></Editor>
    </div>
  );
};

export default New;
