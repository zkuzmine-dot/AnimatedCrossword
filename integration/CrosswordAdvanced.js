import React, { useState, useEffect } from "react";
import "../styles/CrosswordAdvanced.css";
import CrosswordGrid from "../components/CrosswordGrid";
import CluesPanel from "../components/CluesPanel";
import AnimationExamples from "../components/AnimationExamples";
import { gridData, words } from "../components/crosswordData";

export default function CrosswordAdvanced() {
  const [activeClue, setActiveClue] = useState(null);
  const [showAnimationExamples, setShowAnimationExamples] = useState(false);
  const [completedWords, setCompletedWords] = useState(new Set());
  const [status, setStatus] = useState({
    message: "",
    type: "hidden"
  });

  const totalWords = words.horizontal.length + words.vertical.length;
  
  // Если все слова завершены, показываем примеры анимаций
  useEffect(() => {
    if (completedWords.size === totalWords) {
      setShowAnimationExamples(true);
    }
  }, [completedWords, totalWords]);
  
  const handleWordComplete = (word) => {
    setCompletedWords(prev => {
      const newSet = new Set(prev);
      newSet.add(word);
      return newSet;
    });
  };

  const handleWordIncomplete = (word) => {
    setCompletedWords(prev => {
      const newSet = new Set(prev);
      newSet.delete(word);
      return newSet;
    });
  };

  const resetPuzzle = () => {
    setCompletedWords(new Set());
    setStatus({
      message: "",
      type: "hidden"
    });
    setShowAnimationExamples(false);
  };

  const checkAnswers = (correctCells, incorrectCells, emptyCells) => {
    if (incorrectCells === 0 && emptyCells === 0) {
      setStatus({
        message: "Поздравляем! Все ответы верны!",
        type: "success"
      });
      // Показываем примеры анимаций при правильном заполнении
      setShowAnimationExamples(true);
    } else if (incorrectCells > 0) {
      setStatus({
        message: `${incorrectCells} букв неверны. Попробуйте еще раз!`,
        type: "error"
      });
    } else {
      setStatus({
        message: "Кроссворд не завершен. Продолжайте заполнять!",
        type: "warning"
      });
    }
  };

  const toggleAnimationExamples = () => {
    setShowAnimationExamples(prev => !prev);
  };

  return (
    <div className="crossword-advanced-container">
      <header className="crossword-advanced-header">
        <h1 className="crossword-advanced-title">
          CSS Animation Crossword Puzzle
        </h1>
        <p className="crossword-advanced-subtitle">
          Test your knowledge of CSS animations while enjoying interactive examples
        </p>
      </header>

      <div className="crossword-advanced-content">
        <CrosswordGrid 
          gridData={gridData}
          activeClue={activeClue}
          completedWords={completedWords}
          onWordComplete={handleWordComplete}
          onWordIncomplete={handleWordIncomplete}
          onCheckAnswers={checkAnswers}
          onResetPuzzle={resetPuzzle}
          totalWords={totalWords}
          status={status}
        />
        
        <CluesPanel 
          words={words}
          activeClue={activeClue}
          setActiveClue={setActiveClue}
        />
      </div>
      
      <div className="animation-examples-toggle">
        <button 
          className="toggle-examples-button"
          onClick={toggleAnimationExamples}
        >
          {showAnimationExamples ? "Скрыть примеры анимаций" : "Показать примеры анимаций"}
        </button>
      </div>

      {showAnimationExamples && (
        <AnimationExamples />
      )}
    </div>
  );
}