import Button from "./Button";
import DiaryItem from "./DiaryItem";
import "./Diary.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const DiaryList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedDate = () => {
    return data.toSorted((a, b) => {
      const dateA = new Date(a.createdDate).getTime();
      const dateB = new Date(b.createdDate).getTime();
      if (sortType === "oldest") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  };
  const sortedData = getSortedDate();
  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => {
            return nav(`/new`);
          }}
          text={"새로운 일기 쓰기"}
          type={"POSITIVE"}
        ></Button>
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => {
          return <DiaryItem key={item.id} {...item}></DiaryItem>;
        })}
      </div>
    </div>
  );
};
export default DiaryList;
