import React, { useState, useEffect, useRef } from "react";

export default function CrosswordGrid({
  gridData,
  activeClue,
  completedWords,
  totalWords,
  status,
  onWordComplete,
  onWordIncomplete,
  onCheckAnswers,
  onResetPuzzle
}) {
  const [grid, setGrid] = useState({}); // Stores user input
  const [cellStates, setCellStates] = useState({}); // Stores the state of each cell (correct, incorrect, or empty)
  const gridRef = useRef(null);
  
  // Handle input change in a cell
  const handleInputChange = (row, col, value) => {
    const newValue = value.toUpperCase();
    const key = `${row}-${col}`;
    
    setGrid(prev => ({
      ...prev,
      [key]: newValue
    }));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, row, col) => {
    const key = e.key;
    
    let nextRow = row;
    let nextCol = col;
    
    switch (key) {
      case 'ArrowUp':
        nextRow = row - 1;
        break;
      case 'ArrowDown':
        nextRow = row + 1;
        break;
      case 'ArrowLeft':
        nextCol = col - 1;
        break;
      case 'ArrowRight':
        nextCol = col + 1;
        break;
      case 'Backspace':
      case 'Delete':
        const currentKey = `${row}-${col}`;
        // Если в текущей ячейке есть значение, стираем его
        if (grid[currentKey]) {
          setGrid(prev => {
            const newGrid = { ...prev };
            delete newGrid[currentKey];
            return newGrid;
          });
          return; // Мы уже обработали клавишу, выходим из функции
        }
        // Если ячейка пуста и нажат Backspace, переходим к предыдущей и стираем её содержимое
        if (key === 'Backspace') {
          nextCol = col - 1;
          const prevKey = `${nextRow}-${nextCol}`;
          
          // Стираем содержимое предыдущей ячейки, если существует
          if (grid[prevKey]) {
            setGrid(prev => {
              const newGrid = { ...prev };
              delete newGrid[prevKey];
              return newGrid;
            });
          }
        }
        break;
      default:
        return;
    }
    
    e.preventDefault();
    
    // Find the next input element if it exists
    const nextInput = document.querySelector(`input[data-row="${nextRow}"][data-col="${nextCol}"]`);
    if (nextInput) {
      nextInput.focus();
    }
  };

  // Auto-advance to next cell after input
  const handleInput = (e, row, col) => {
    if (e.currentTarget.value) {
      // Find next input in the same direction
      let nextRow = row;
      let nextCol = col;
      
      if (activeClue) {
        if (activeClue.direction === 'horizontal') {
          nextCol = col + 1;
        } else {
          nextRow = row + 1;
        }
      } else {
        nextCol = col + 1;
      }
      
      // Find the next input element
      const nextInput = document.querySelector(`input[data-row="${nextRow}"][data-col="${nextCol}"]`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Check if words are completed
  useEffect(() => {
    // Check all words
    const checkWord = (startRow, startCol, direction, word) => {
      let isComplete = true;
      let row = startRow;
      let col = startCol;
      
      for (let i = 0; i < word.length; i++) {
        const key = `${row}-${col}`;
        if (!grid[key]) {
          isComplete = false;
          break;
        }
        
        // Move to next cell based on direction
        if (direction === 'horizontal') {
          col++;
        } else {
          row++;
        }
      }
      
      return isComplete;
    };
    
    // Импортируем данные из компонента выше
    const words = {
      horizontal: [
        { word: "LOADER", row: 0, col: 7 },
        { word: "TRANSITION", row: 4, col: 3 },
        { word: "TRANSITIONEND", row: 8, col: 0 },
        { word: "TRANSFORM", row: 14, col: 3 },
        { word: "INFINITE", row: 18, col: 5 }
      ],
      vertical: [
        { word: "OPACITY", row: 0, col: 8 },
        { word: "KEYFRAMES", row: 4, col: 1 },
        { word: "TIMINGFUNCTION", row: 4, col: 3 },
        { word: "JAVASCRIPT", row: 11, col: 5 }
      ]
    };
    
    // Check each horizontal word
    words.horizontal.forEach(wordObj => {
      const { word, row, col } = wordObj;
      const isComplete = checkWord(row, col, 'horizontal', word);
      
      if (isComplete && !completedWords.has(word)) {
        onWordComplete(word);
      } else if (!isComplete && completedWords.has(word)) {
        onWordIncomplete(word);
      }
    });
    
    // Check each vertical word
    words.vertical.forEach(wordObj => {
      const { word, row, col } = wordObj;
      const isComplete = checkWord(row, col, 'vertical', word);
      
      if (isComplete && !completedWords.has(word)) {
        onWordComplete(word);
      } else if (!isComplete && completedWords.has(word)) {
        onWordIncomplete(word);
      }
    });
  }, [grid, completedWords, onWordComplete, onWordIncomplete]);
  
  // Focus on active clue
  useEffect(() => {
    if (activeClue) {
      const input = document.querySelector(`input[data-row="${activeClue.row}"][data-col="${activeClue.col}"]`);
      if (input) {
        input.focus();
      }
    }
  }, [activeClue]);

  // Handle check answers
  const handleCheckAnswers = () => {
    let correctCells = 0;
    let incorrectCells = 0;
    let emptyCells = 0;
    const newCellStates = {};
    
    // Check each cell
    for (let row = 0; row < gridData.length; row++) {
      for (let col = 0; col < gridData[row].length; col++) {
        const correctValue = gridData[row][col];
        if (correctValue !== null) {
          const key = `${row}-${col}`;
          const userValue = grid[key] || '';
          
          if (userValue === '') {
            emptyCells++;
            newCellStates[key] = '';
          } else if (userValue === correctValue) {
            correctCells++;
            newCellStates[key] = 'correct';
          } else {
            incorrectCells++;
            newCellStates[key] = 'incorrect';
          }
        }
      }
    }
    
    setCellStates(newCellStates);
    onCheckAnswers(correctCells, incorrectCells, emptyCells);
  };

  // Handle reset puzzle
  const handleResetPuzzle = () => {
    setGrid({});
    setCellStates({});
    onResetPuzzle();
  };

  return (
    <div className="crossword-grid-container">
      <h2 className="crossword-grid-title">Crossword Grid</h2>
      
      {/* Grid Container */}
      <div className="crossword-grid-area" ref={gridRef}>
        <div 
          className="crossword-grid"
          style={{ 
            gridTemplateColumns: `repeat(${gridData[0].length}, minmax(2rem, 2.5rem))`,
            gridTemplateRows: `repeat(${gridData.length}, minmax(2rem, 2.5rem))`
          }}
        >
          {gridData.map((row, rowIndex) => (
            row.map((cell, colIndex) => {
              const key = `${rowIndex}-${colIndex}`;
              const cellState = cellStates[key] || '';
              
              return (
                <div 
                  key={key} 
                  className={`crossword-cell ${
                    cell === null ? 'cell-empty' : 'cell-active'
                  } ${
                    cellState === 'correct' ? 'cell-correct' : 
                    cellState === 'incorrect' ? 'cell-incorrect' : ''
                  }`}
                >
                  {cell !== null && (
                    <>
                      {/* Cell number */}
                      {(rowIndex === 0 && colIndex === 7) || // LOADER
                       (rowIndex === 4 && colIndex === 3) || // TRANSITION
                       (rowIndex === 8 && colIndex === 0) || // TRANSITIONEND
                       (rowIndex === 14 && colIndex === 3) || // TRANSFORM
                       (rowIndex === 18 && colIndex === 5) || // INFINITE
                       (rowIndex === 4 && colIndex === 1) || // KEYFRAMES
                       (rowIndex === 0 && colIndex === 8) || // OPACITY
                       (rowIndex === 11 && colIndex === 5) ? ( // JAVASCRIPT
                        <span className="cell-number">
                          {(rowIndex === 0 && colIndex === 7) ? "5" : 
                           (rowIndex === 4 && colIndex === 3) ? "1" :
                           (rowIndex === 8 && colIndex === 0) ? "3" :
                           (rowIndex === 14 && colIndex === 3) ? "6" :
                           (rowIndex === 18 && colIndex === 5) ? "2" :
                           (rowIndex === 4 && colIndex === 1) ? "7" :
                           (rowIndex === 0 && colIndex === 8) ? "4" :
                           (rowIndex === 11 && colIndex === 5) ? "8" : ""}
                        </span>
                      ) : null}
                      
                      <input
                        type="text"
                        maxLength={1}
                        className="crossword-input"
                        data-row={rowIndex}
                        data-col={colIndex}
                        value={grid[key] || ''}
                        onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                        onInput={(e) => handleInput(e, rowIndex, colIndex)}
                      />
                    </>
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>
      
      {/* Controls */}
      <div className="crossword-controls">
        <div className="crossword-buttons">
          <button onClick={handleCheckAnswers} className="check-button">
            Проверить ответы
          </button>
          <button onClick={handleResetPuzzle} className="reset-button">
            Сбросить
          </button>
        </div>
        <div className="crossword-progress">
          <span className="progress-text">{completedWords.size}/{totalWords} слов завершено</span>
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{width: `${(completedWords.size / totalWords) * 100}%`}}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Status Message */}
      {status.type !== "hidden" && (
        <div 
          className={`status-message ${
            status.type === "success" ? "status-success" : 
            status.type === "error" ? "status-error" : 
            "status-warning"
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}