import React from "react";
import { decode } from 'html-entities'
import { nanoid } from "nanoid";

export default function QuizQuestion(props) {
  const { options, isGameEnd, selectedOption, correctAnswer } = props;
  const optionElement = options.map(option => {
    let buttonStyling = "bg-blue-100 rounded-md";
    if (isGameEnd) {
      if (selectedOption === "") {
        if (option === correctAnswer) {
          buttonStyling = "bg-green-500 rounded-md text-white"
        }
      }
      else if (selectedOption !== "") {
        if (selectedOption === correctAnswer) {
          if (option === selectedOption) {
            buttonStyling = "bg-green-500 rounded-md text-white"
          }
        } else if (selectedOption !== correctAnswer) {
          if (option === selectedOption) {
            buttonStyling = "bg-red-400 rounded-md text-white"
          } else if (option === correctAnswer) {
            buttonStyling = "bg-green-500 rounded-md text-white"
          }
        }
      }

    }
    else {
      buttonStyling += "hover:bg-blue-300 hover:translate-y-0.5 duration-300"
      if (option === selectedOption) {
        buttonStyling = "bg-blue-500 text-white rounded-md"
      }
    }
    return (<button
      key={nanoid()}
      className={buttonStyling}
      onClick={() => props.handleOptionClick(props.id, option)}
      disabled={isGameEnd}>{option}</button>)
  })
  return (
    <>
      <h2 className="text-xl">{decode(props.question)}</h2>
      <div className="flex items-center justify-between gap-x-1">{optionElement}</div>
      <hr className="border-t-4 border-cyan-100" />
    </>
  )
}