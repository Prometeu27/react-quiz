import React from 'react';

const Results = ({ selectedTopic, correctAnswers, totalQuestions, answeredQuestions }) => {
  return (
    <div>
      <h1>Results for {selectedTopic}</h1>
      <p>You answered {correctAnswers} out of {totalQuestions} questions correctly.</p>
      {answeredQuestions.filter(q => !q.isCorrect).map((question, index) => (
        <div key={index}>
          <h5>{question.text}</h5>
          <p>
            <strong>Your Answers:</strong><br></br>
            {question.yourAnswers.join(", ").split(", ").map((item, index, array) => (
              <React.Fragment key={index}>
                • {item}
                {index < array.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
          <p>
            <strong>Correct Answers: </strong><br></br>
            {question.correctAnswers.join(", ").split(", ").map((item, index, array) => (
              <React.Fragment key={index}>
                • {item}
                {index < array.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
          <br></br>

        </div>
      ))}
    </div>
  );
};



export default Results;
