import React, { useState, useEffect } from 'react';
import quizData from './data.json';

const QuizView = ({ selectedTopic, numQuestions, onComplete, setCorrectAnswers, setAnsweredQuestions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(new Set());
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const quiz = quizData.quizzes.find(q => q.title === selectedTopic);
        if (quiz) {
            setQuestions(quiz.questions.slice(0, numQuestions));
        }
        setSelectedOptions(new Set());
        setSubmitted(false);
    }, [selectedTopic, numQuestions]);

    const handleOptionClick = (option) => {
        if (!submitted) {
            const newSelections = new Set(selectedOptions);
            if (newSelections.has(option)) {
                newSelections.delete(option);
            } else {
                newSelections.add(option);
            }
            setSelectedOptions(newSelections);
        }
    };
    const handleNextQuestion = () => {
        if (currentQuestionIndex < numQuestions - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedOptions(new Set());
            setSubmitted(false);
        } else {
            onComplete();
        }
    };
    const handleSubmit = () => {
        setSubmitted(true);
        const correctAnswers = questions[currentQuestionIndex].answer;
        const correctAnswersSet = new Set(Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers]);

        const isCorrect = selectedOptions.size === correctAnswersSet.size &&
            [...selectedOptions].every(opt => correctAnswersSet.has(opt));

        if (isCorrect) {
            setCorrectAnswers(prev => prev + 1);
        }

        const answeredQuestion = {
            text: questions[currentQuestionIndex].question,
            yourAnswers: [...selectedOptions],
            correctAnswers: Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers],
            isCorrect: isCorrect
        };
        setAnsweredQuestions(prev => [...prev, answeredQuestion]);
    };

    const getOptionClass = (option) => {
        const correctAnswers = questions[currentQuestionIndex].answer;
        const isMultipleAnswer = Array.isArray(correctAnswers);
    
        if (submitted) {
            if (isMultipleAnswer) {
                // Logic for multiple-answer questions
                if (new Set(correctAnswers).has(option)) {
                    return 'option-btn picked--correct';
                } else if (selectedOptions.has(option)) {
                    return 'option-btn picked--incorrect';
                }
            } else {
                // Logic for single-answer questions
                if (option === correctAnswers) {
                    return 'option-btn picked--correct';
                } else if (selectedOptions.has(option)) {
                    return 'option-btn picked--incorrect';
                }
            }
        }
        return selectedOptions.has(option) ? 'option-btn selected' : 'option-btn';
    };

    const handleIndex = (index) => {
        switch (index) {
            case 0:
                return 'A';
            case 1:
                return 'B';
            case 2:
                return 'C';
            case 3:
                return 'D';
            default:
                return 'err';
        }
    };

    return (
        <div class="pt-5">
            <div class="container">
                <div class="row">
                    <div class="col-5 offset-1">
                        {selectedTopic}

                    </div>
                </div>
            </div>
            {questions.length > 0 && (
                <div class="container mt-5">
                    <div class="row">
                        <div class="col-5 offset-1">
                            <h1>{questions[currentQuestionIndex].question}</h1>
                        </div>

                        <div class="col-5">
                            <div>
                                {questions[currentQuestionIndex].options.map((option, index) => (
                                    <a key={index} onClick={() => handleOptionClick(option)}
                                        className={getOptionClass(option)}
                                        href="#!">
                                        <div class="btn-rectangle">{handleIndex(index)}</div> {option}
                                    </a>
                                ))}
                            </div>
                            {!submitted && (
                                <button class="main-btn w-100" onClick={handleSubmit} disabled={selectedOptions.size === 0}>
                                    Submit Answer
                                </button>
                            )}
                            {submitted && (
                                <button class="main-btn w-100" onClick={handleNextQuestion}>
                                    {currentQuestionIndex < numQuestions - 1 ? 'Next Question' : 'See Results'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>

    );
};

export default QuizView;
