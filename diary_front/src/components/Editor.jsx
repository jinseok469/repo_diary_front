import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constants";
import useDate from "../hooks/useDate";

const Editor = ({ onSubmit, initData }) => {
  const ref = useRef();
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });
  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: useDate(new Date(initData.createdDate)),
      });
    }
  }, [initData]);

  const nav = useNavigate();

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = useDate(new Date(value));
    }
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    if (!input.content) {
      ref.current.focus();
      return;
    }
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={useDate(new Date(input.createdDate))}
          type="date"
        ></input>
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((emotion) => {
            return (
              <EmotionItem
                key={emotion.emotionId}
                onClick={() =>
                  onChangeInput({
                    target: {
                      name: "emotionId",
                      value: emotion.emotionId,
                    },
                  })
                }
                {...emotion}
                isSelected={emotion.emotionId === input.emotionId}
              ></EmotionItem>
            );
          })}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          ref={ref}
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        ></textarea>
      </section>
      <section className="button_section">
        <Button
          text={"취소하기"}
          onClick={() => {
            nav(-1);
          }}
        ></Button>
        <Button
          onClick={onClickSubmitButton}
          text={"작성완료"}
          type={"POSITIVE"}
        ></Button>
      </section>
    </div>
  );
};

export default Editor;
