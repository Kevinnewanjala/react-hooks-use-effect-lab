import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timerId = setTimeout(() => {
      // Callback function to execute after 1 second
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      // Cleanup function to clear the timeout if component unmounts or re-renders
      clearTimeout(timerId);
    };
  }, [timeRemaining]); // Run effect whenever timeRemaining changes

  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10); // Reset timeRemaining to 10 seconds
      onAnswered(false); // Call onAnswered callback with a value of false
    }
  }, [timeRemaining, onAnswered]); // Run effect whenever timeRemaining or onAnswered changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
