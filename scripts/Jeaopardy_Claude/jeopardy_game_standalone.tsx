import React, { useState, useEffect } from 'react';
import { Trophy, Users } from 'lucide-react';

const JeopardyGame = () => {
  const [gameState, setGameState] = useState('setup'); // 'setup', 'playing'
  const [numTeams, setNumTeams] = useState(2);
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  const categories = [
    {
      name: "Science",
      questions: [
        { value: 200, question: "This planet is known as the Red Planet", answer: "What is Mars?" },
        { value: 400, question: "H2O is the chemical formula for this substance", answer: "What is water?" },
        { value: 600, question: "This force keeps us grounded on Earth", answer: "What is gravity?" },
        { value: 800, question: "The human body has this many bones", answer: "What is 206?" },
        { value: 1000, question: "This is the speed of light in meters per second", answer: "What is 299,792,458?" }
      ]
    },
    {
      name: "History",
      questions: [
        { value: 200, question: "This war ended in 1945", answer: "What is World War II?" },
        { value: 400, question: "The Declaration of Independence was signed in this year", answer: "What is 1776?" },
        { value: 600, question: "This ancient wonder is located in Egypt", answer: "What are the Pyramids (of Giza)?" },
        { value: 800, question: "This empire was ruled by Julius Caesar", answer: "What is the Roman Empire?" },
        { value: 1000, question: "The Berlin Wall fell in this year", answer: "What is 1989?" }
      ]
    },
    {
      name: "Geography",
      questions: [
        { value: 200, question: "This is the largest ocean on Earth", answer: "What is the Pacific Ocean?" },
        { value: 400, question: "This country has the most population", answer: "What is India (or China)?" },
        { value: 600, question: "This is the capital of Australia", answer: "What is Canberra?" },
        { value: 800, question: "This river is the longest in the world", answer: "What is the Nile?" },
        { value: 1000, question: "This is the smallest country in the world", answer: "What is Vatican City?" }
      ]
    },
    {
      name: "Pop Culture",
      questions: [
        { value: 200, question: "This streaming service created 'Stranger Things'", answer: "What is Netflix?" },
        { value: 400, question: "This artist painted the Mona Lisa", answer: "Who is Leonardo da Vinci?" },
        { value: 600, question: "This band had hits with 'Hey Jude' and 'Let It Be'", answer: "Who are The Beatles?" },
        { value: 800, question: "This superhero is also known as Bruce Wayne", answer: "Who is Batman?" },
        { value: 1000, question: "This director created 'Jurassic Park' and 'E.T.'", answer: "Who is Steven Spielberg?" }
      ]
    },
    {
      name: "EWS",
      questions: [
        { value: 200, question: "In the 1990s, EWS focused on this type of risk management", answer: "What is Deposit Risk Management?" },
        { value: 400, question: "This service was launched in 2001-05 as an account opening service-based offering", answer: "What is Identity Chek?" },
        { value: 600, question: "PPS was spun out of this company as a fully bank-owned company in 2006-09", answer: "What is First Data?" },
        { value: 800, question: "In 2013-15, this company was acquired, expanding EWS's reach in mobile authentication", answer: "What is Payfone?" },
        { value: 1000, question: "This brand was launched in August 2024 to deliver a new merchant checkout experience", answer: "What is Paze?" }
      ]
    }
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && selectedQuestion) {
        setSelectedQuestion(null);
        setShowAnswer(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedQuestion]);

  const startGame = () => {
    const newTeams = Array.from({ length: numTeams }, (_, i) => ({
      name: `Team ${i + 1}`,
      score: 0
    }));
    setTeams(newTeams);
    setGameState('playing');
    setCurrentTeam(0);
    setAnsweredQuestions(new Set());
  };

  const handleQuestionClick = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    if (!answeredQuestions.has(key)) {
      setSelectedQuestion({ categoryIndex, questionIndex, key });
      setShowAnswer(false);
    }
  };

  const handleAnswer = (isCorrect) => {
    const { categoryIndex, questionIndex, key } = selectedQuestion;
    const questionValue = categories[categoryIndex].questions[questionIndex].value;
    
    const newTeams = [...teams];
    if (isCorrect) {
      newTeams[currentTeam].score += questionValue;
    }
    setTeams(newTeams);
    
    setAnsweredQuestions(new Set([...answeredQuestions, key]));
    setSelectedQuestion(null);
    setShowAnswer(false);
    setCurrentTeam((currentTeam + 1) % teams.length);
  };

  const resetGame = () => {
    setGameState('setup');
    setTeams([]);
    setCurrentTeam(0);
    setAnsweredQuestions(new Set());
    setSelectedQuestion(null);
    setShowAnswer(false);
  };

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4 flex items-center justify-center">
        <div className="bg-blue-600 rounded-lg shadow-2xl p-12 border-4 border-yellow-400 max-w-md w-full">
          <h1 className="text-5xl font-bold text-yellow-400 mb-8 text-center" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.5)' }}>
            JEOPARDY!
          </h1>
          <div className="text-center mb-6 text-yellow-200 text-sm font-semibold">
            CLASSIC VERSION 1
          </div>
          <div className="mb-8">
            <label className="flex items-center gap-3 text-white text-2xl font-bold mb-4">
              <Users size={32} className="text-yellow-400" />
              Number of Teams:
            </label>
            <input
              type="number"
              min="1"
              max="6"
              value={numTeams}
              onChange={(e) => setNumTeams(Math.max(1, Math.min(6, parseInt(e.target.value) || 1)))}
              className="w-full p-4 text-3xl font-bold rounded border-2 border-blue-400 text-center"
            />
          </div>
          <button
            onClick={startGame}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transition-all hover:scale-105"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-yellow-400 mb-4" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.5)' }}>
            JEOPARDY!
          </h1>
          <div className="text-yellow-200 text-sm font-semibold">
            CLASSIC VERSION 1
          </div>
        </div>

        {/* Team Scores */}
        <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: `repeat(${teams.length}, minmax(0, 1fr))` }}>
          {teams.map((team, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg shadow-lg border-4 transition-all ${
                idx === currentTeam
                  ? 'bg-yellow-400 border-yellow-500 scale-105'
                  : 'bg-blue-700 border-blue-500'
              }`}
            >
              <div className={`text-center font-bold text-lg ${idx === currentTeam ? 'text-blue-900' : 'text-white'}`}>
                {team.name}
                {idx === currentTeam && <div className="text-sm">(Current Turn)</div>}
              </div>
              <div className={`text-center text-3xl font-bold ${idx === currentTeam ? 'text-blue-900' : 'text-yellow-400'}`}>
                ${team.score}
              </div>
            </div>
          ))}
        </div>

        {/* Game Board or Question */}
        {!selectedQuestion ? (
          <div className="grid grid-cols-5 gap-2 mb-6">
            {categories.map((category, catIdx) => (
              <div key={catIdx} className="flex flex-col gap-2">
                {/* Category Header */}
                <div className="bg-blue-600 text-white p-3 text-center font-bold text-base rounded shadow-lg border-2 border-blue-400">
                  {category.name.toUpperCase()}
                </div>
                {/* Questions */}
                {category.questions.map((q, qIdx) => {
                  const key = `${catIdx}-${qIdx}`;
                  const isAnswered = answeredQuestions.has(key);
                  return (
                    <button
                      key={qIdx}
                      onClick={() => handleQuestionClick(catIdx, qIdx)}
                      disabled={isAnswered}
                      className={`p-6 text-3xl font-bold rounded shadow-lg border-2 transition-all min-h-[80px] ${
                        isAnswered
                          ? 'bg-blue-900 text-blue-900 border-blue-800 cursor-not-allowed'
                          : 'bg-blue-600 text-yellow-400 border-blue-400 hover:bg-blue-500 hover:scale-105 cursor-pointer'
                      }`}
                    >
                      {isAnswered ? '\u00A0' : `${q.value}`}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          /* Question Display */
          <div className="bg-blue-600 rounded-lg shadow-2xl p-12 border-4 border-yellow-400">
            <div className="text-center mb-8">
              <div className="text-yellow-400 text-2xl font-bold mb-4">
                {categories[selectedQuestion.categoryIndex].name.toUpperCase()} - $
                {categories[selectedQuestion.categoryIndex].questions[selectedQuestion.questionIndex].value}
              </div>
              <div className="text-white text-4xl font-bold mb-8">
                {categories[selectedQuestion.categoryIndex].questions[selectedQuestion.questionIndex].question}
              </div>
              
              {!showAnswer ? (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg text-xl shadow-lg transition-all hover:scale-105 mb-4"
                >
                  Show Answer
                </button>
              ) : (
                <>
                  <div className="text-yellow-200 text-2xl mb-8 italic">
                    Answer: {categories[selectedQuestion.categoryIndex].questions[selectedQuestion.questionIndex].answer}
                  </div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => handleAnswer(true)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transition-all hover:scale-105"
                    >
                      ✓ Correct
                    </button>
                    <button
                      onClick={() => handleAnswer(false)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transition-all hover:scale-105"
                    >
                      ✗ Wrong
                    </button>
                  </div>
                </>
              )}
              
              <div className="text-white text-sm mt-6 opacity-75">
                Press ESC to go back
              </div>
            </div>
          </div>
        )}

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={resetGame}
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all hover:scale-105"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default JeopardyGame;