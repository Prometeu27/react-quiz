import React, { useState } from 'react';
import QuizView from './QuizView'; 
import Results from './Results';   
import TopicsList from './TopicsList';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const App = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // handle selected topic
  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    setQuizCompleted(false);
  };

  // handle quantity of questions 
  const handleNumQuestionsChange = (number) => {
    setNumQuestions(number);
  };

  // quiz status
  const handleQuizComplete = () => {
    setQuizCompleted(true);
  };

  // reset all values in quizz
  const resetQuiz = () => {
    setSelectedTopic(null);
    setQuizCompleted(false);
    setCorrectAnswers(0);
  };

  return (

    <div class="container pt-5">

      {!selectedTopic && ( // if topic is not yet selected, print topic list
        <TopicsList
          selectedTopic={selectedTopic}
          onTopicChange={handleTopicChange}
          numQuestions={numQuestions}
          onNumQuestionsChange={handleNumQuestionsChange}
        />
      )}
      {selectedTopic && !quizCompleted && ( // if topic is selected, but quiz not completed
        <QuizView
          selectedTopic={selectedTopic}
          numQuestions={numQuestions}
          onComplete={handleQuizComplete}
          setCorrectAnswers={setCorrectAnswers}
          setAnsweredQuestions={setAnsweredQuestions}
        />
      )}
      {quizCompleted && ( // if quiz is completed
        <div>
          <Results
            selectedTopic={selectedTopic}
            correctAnswers={correctAnswers}
            totalQuestions={numQuestions}
            answeredQuestions={answeredQuestions}
          />
          <button class="main-btn" onClick={resetQuiz}>Start a New Quiz</button>
        </div>
      )}
    </div>
  );
};

export default App;
