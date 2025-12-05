import React, { useState, useEffect } from 'react';
import { Trophy, Users, Sparkles } from 'lucide-react';

const JeopardyGame = () => {
  const [gameState, setGameState] = useState('setup'); // 'setup', 'generating', 'playing'
  const [numTeams, setNumTeams] = useState(2);
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [categories, setCategories] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

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

  const generateQuestions = async () => {
    setIsGenerating(true);
    setGameState('generating');

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: `Generate 5 unique Jeopardy categories with 5 questions each. One category MUST be "EWS" about Early Warning Services company history.

For the EWS category, use these facts:
- 1990s: Focus on Deposit Risk Management
- 2001-05: Identity Chek service launched
- 2006-09: PPS spun out from First Data
- 2013-15: Payfone acquired for mobile authentication
- 2024: Paze brand launched for merchant checkout

For the other 4 categories, choose diverse topics like Science, History, Geography, Pop Culture, Sports, Technology, Movies, Music, etc.

Return ONLY a JSON object with this exact structure, no other text:
{
  "categories": [
    {
      "name": "Category Name",
      "questions": [
        {"value": 200, "question": "Question text", "answer": "What/Who is Answer?"},
        {"value": 400, "question": "Question text", "answer": "What/Who is Answer?"},
        {"value": 600, "question": "Question text", "answer": "What/Who is Answer?"},
        {"value": 800, "question": "Question text", "answer": "What/Who is Answer?"},
        {"value": 1000, "question": "Question text", "answer": "What/Who is Answer?"}
      ]
    }
  ]
}

Make questions progressively harder (200 easiest, 1000 hardest). All answers should be in Jeopardy format starting with "What is" or "Who is".`
            }
          ]
        })
      });

      const data = await response.json();
      const content = data.content.find(block => block.type === "text")?.text || "";
      
      // Extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        setCategories(parsedData.categories);
        setGameState('playing');
      } else {
        throw new Error("Failed to parse response");
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("Failed to generate questions. Please try again.");
      setGameState('setup');
    } finally {
      setIsGenerating(false);
    }
  };

  const startGame = async () => {
    const newTeams = Array.from({ length: numTeams }, (_, i) => ({
      name: `Team ${i + 1}`,
      score: 0
    }));
    setTeams(newTeams);
    setCurrentTeam(0);
    setAnsweredQuestions(new Set());
    await generateQuestions();
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
    setCategories([]);
  };

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4 flex items-center justify-center">
        <div className="bg-blue-600 rounded-lg shadow-2xl p-12 border-4 border-yellow-400 max-w-md w-full">
          <div className="flex items-center justify-center gap-3 mb-8">
            <h1 className="text-5xl font-bold text-yellow-400 text-center" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.5)' }}>
              JEOPARDY!
            </h1>
            <Sparkles className="text-yellow-400" size={40} />
          </div>
          <div className="text-center mb-6 text-yellow-200 text-sm font-semibold">
            AI-POWERED VERSION 2
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
            Generate New Game
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4 flex items-center justify-center">
        <div className="bg-blue-600 rounded-lg shadow-2xl p-12 border-4 border-yellow-400 max-w-md w-full text-center">
          <Sparkles className="text-yellow-400 mx-auto mb-6 animate-pulse" size={64} />
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Generating Questions...
          </h2>
          <p className="text-white text-lg">
            AI is creating fresh Jeopardy questions for you!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-5xl font-bold text-yellow-400" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.5)' }}>
              JEOPARDY!
            </h1>
            <Sparkles className="text-yellow-400" size={32} />
          </div>
          <div className="text-yellow-200 text-sm font-semibold mt-2">
            AI-POWERED VERSION 2
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
                      {isAnswered ? '\u00A0' : `$${q.value}`}
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