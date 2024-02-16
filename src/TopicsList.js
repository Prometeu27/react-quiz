import React from 'react';

const TopicsList = ({ selectedTopic, onTopicChange, numQuestions, onNumQuestionsChange }) => {
    const topics = ['HTML', 'CSS', 'JavaScript', 'Accessibility'];

    // trigger once topic button is clicked
    const handleTopicClick = (topic) => { 
        onTopicChange(topic);
    };

    // slider input 
    const handleSliderChange = (event) => {
        onNumQuestionsChange(event.target.value);
    };

    return (
        <div class="pt-5">
            <div class="container mt-5">
                <div class="row">
                    <div class="col-5 offset-1">
                        <h1 style={{fontWeight: 200}} class="mb-0">Welcome to the</h1>
                        <h1><b>Frontend Quiz!</b></h1>

                        <div>
                            <input
                                type="range"
                                min="5"
                                max="15"
                                value={numQuestions}
                                onChange={handleSliderChange}
                                step="1"
                                className="slider"
                            />
                            <p>Number of Questions: {numQuestions}</p>
                        </div>
                    </div>

                    <div class="col-5">
                        
                        {topics.map(topic => (
                            <a key={topic} onClick={() => handleTopicClick(topic)} className={`option-btn ${selectedTopic === topic ? 'selected' : ''}`}>
                                <div class="btn-rectangle">A</div> {topic}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

        </div>


    );
};

export default TopicsList;
