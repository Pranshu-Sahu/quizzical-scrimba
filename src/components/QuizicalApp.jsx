import React from "react";
import { nanoid } from "nanoid";
import Intro from "./Intro";
import QuizQuestion from "./QuizQuestion";
const url =
  "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple";

function QuizicalApp() {
  const [startQuiz, setStartQuiz] = React.useState(false);
  const [endQuiz, setEndQuiz] = React.useState(false);
  const [quizQuestions, setQuizQuestions] = React.useState([]);
  const [score, setScore] = React.useState(0)
  React.useEffect(() => {
    if (!endQuiz) {
      fetch(url)
      .then((response) => response)
      .then((data) => data.json())
      .then((result) => {
        const quizData = result.results.map((item) => {
          const options = [...item.incorrect_answers, item.correct_answer].sort(
            function (a, b) {
              return 0.5 - Math.random();
            }
          );
          return {
            question: item.question,
            options: options,
            correctAnswer: item.correct_answer,
            id: nanoid(),
            selectedOption: "",
            isGameEnd: false
          };
        });
        setQuizQuestions(quizData);
      });
    }
  }, [endQuiz]);
  function handleOptionClick(id, option) {
    setQuizQuestions(prevState => {
      return prevState.map(item => {
        if (item.id === id) {
          return { ...item, selectedOption: option }
        }
        return item
      })
    })
  }

  function handleClick() {
    if (!endQuiz) {
      setEndQuiz(true);
      setQuizQuestions(prevState => {
        return prevState.map(item => ({ ...item, isGameEnd: true }))
      })
      let score = 0;
      quizQuestions.forEach(item => {
        (item.selectedOption === item.correctAnswer) && score++;
      })
      setScore(score)
    }
    else if (endQuiz) {
      setEndQuiz(false)
    }
  }

  const questionElements = quizQuestions.map(question => (<QuizQuestion key={question.id} {...question} handleOptionClick={handleOptionClick} />))

  return (
    <div>
      {!startQuiz ? (
        <Intro beginQuiz={() => setStartQuiz(true)} />
      ) : (
        <div className="max-w-lg mx-auto flex flex-col gap-y-2.5">
          <h1 className="text-center text-2xl mb-1 underline">Quiz</h1>
          {questionElements}
          {endQuiz && <div className="text-center text-blue-800 font-semibold">Your score is {score}</div>}
          <button className="block p-2 text-xl my-4 rounded-md mx-auto text-white bg-blue-500 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-800 duration-300" onClick={handleClick}>{!endQuiz ? "Check Answers" : "PlayAgain"} </button>
        </div>
      )}

    </div>
  );
}

export default QuizicalApp;
