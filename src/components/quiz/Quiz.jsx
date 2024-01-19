import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";
import finished from "../../assets/finished.gif";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [isLocked, setIsLocked] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setReult] = useState(true);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];

  const checkAnswer = (e, answer) => {
    if (isLocked === false) {
      if (question.answer === answer) {
        e.target.classList.add("correct");
        setIsLocked(true);
        setScore((score) => score + 1);
      } else {
        e.target.classList.add("wrong");
        setIsLocked(true);
        option_array[question.answer - 1].current.classList.add("correct");
      }
    }
  };

  const toNext = () => {
    if (isLocked === true) {
      if (index === data.length - 1) {
        setReult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setIsLocked(false);
      option_array.map((opt) => {
        opt.current.classList.remove("wrong");
        opt.current.classList.remove("correct");
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setIsLocked(false);
    setReult(false);
  };

  return (
    <div className="container">
      {result ? (
        <div className="result-container">
          <div className="result-header">
            <h1>Quiz finished</h1>
            <img src={finished} alt="" />
          </div>
          <div className="details">
            <h2>
              You scored {score} out of {data.length}
            </h2>
            <button
              onClick={() => {
                reset();
              }}
            >
              Reset
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1>Quiz App</h1>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={option1}
              onClick={(e) => {
                checkAnswer(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={option2}
              onClick={(e) => {
                checkAnswer(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={option3}
              onClick={(e) => {
                checkAnswer(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={option4}
              onClick={(e) => {
                checkAnswer(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button
            onClick={() => {
              toNext();
            }}
          >
            Next
          </button>
          <div className="index">
            <span>
              {index + 1} of {data.length} questions
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
