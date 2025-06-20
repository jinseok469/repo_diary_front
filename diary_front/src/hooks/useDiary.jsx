import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../MainApp";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const nav = useNavigate();
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();
  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다");
      nav("/", { replace: true });
    }
    setCurDiaryItem(currentDiaryItem);
  }, [id]);
  return curDiaryItem;
};

export default useDiary;
