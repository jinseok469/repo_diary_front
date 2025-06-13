import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext, DiaryStateContext } from "../MainApp";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const curDiaryItem = useDiary(params.id);

  const stepBack = () => {
    nav(-1);
  };
  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(params.id, input.createdDate, input.emotionId, input.content);
      nav("/", { replace: true });
    }
  };

  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제 할까요? 다시 복구되지 않습니다")) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button onClick={stepBack} text={"< 뒤로가기"}></Button>}
        rightChild={
          <Button
            onClick={onClickDelete}
            text={"삭제하기"}
            type={"NEGATIVE"}
          ></Button>
        }
      ></Header>
      <Editor onSubmit={onSubmit} initData={curDiaryItem}></Editor>
    </div>
  );
};

export default Edit;
