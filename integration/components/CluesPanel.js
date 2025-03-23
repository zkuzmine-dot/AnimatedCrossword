import React from "react";

export default function CluesPanel({ words, activeClue, setActiveClue }) {
  const handleClueClick = (word, direction) => {
    setActiveClue({
      direction,
      row: word.row,
      col: word.col,
      word: word.word
    });
  };

  return (
    <div className="clues-panel">
      <h2 className="clues-title">Подсказки</h2>
      
      <div className="clues-sections">
        <div className="clues-section">
          <h3 className="clues-direction">По горизонтали</h3>
          <ul className="clues-list">
            {words.horizontal.map((word) => (
              <li 
                key={`h-${word.word}`}
                className={`clue-item ${
                  activeClue?.direction === 'horizontal' && 
                  activeClue?.row === word.row && 
                  activeClue?.col === word.col ? 'clue-active' : ''
                }`}
                onClick={() => handleClueClick(word, 'horizontal')}
              >
                <span className="clue-number">
                  {word.word === "LOADER" ? "5. " : 
                   word.word === "TRANSITION" ? "1. " : 
                   word.word === "TRANSITIONEND" ? "3. " : 
                   word.word === "TRANSFORM" ? "6. " : 
                   word.word === "INFINITE" ? "2. " : ""}
                </span>
                <span className="clue-text">{word.clue}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="clues-section">
          <h3 className="clues-direction">По вертикали</h3>
          <ul className="clues-list">
            {words.vertical.map((word) => (
              <li 
                key={`v-${word.word}`}
                className={`clue-item ${
                  activeClue?.direction === 'vertical' && 
                  activeClue?.row === word.row && 
                  activeClue?.col === word.col ? 'clue-active' : ''
                }`}
                onClick={() => handleClueClick(word, 'vertical')}
              >
                <span className="clue-number">
                  {word.word === "OPACITY" ? "4. " : 
                   word.word === "KEYFRAMES" ? "7. " : 
                   word.word === "TIMINGFUNCTION" ? "1. " : 
                   word.word === "JAVASCRIPT" ? "8. " : ""}
                </span>
                <span className="clue-text">{word.clue}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}