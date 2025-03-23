import { useState, useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    
    import("@/lib/crosswordData").then(({ words }) => {
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
    <div className="w-full lg:w-3/5 bg-white rounded-lg shadow-md p-4 overflow-hidden flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-primary">Crossword Grid</h2>
      
      {/* Grid Container */}
      <div className="relative overflow-auto mb-6" ref={gridRef}>
        <div 
          className="grid gap-0 max-w-full" 
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
                  className={`cell relative border border-gray-300 aspect-square transition-all ${
                    cell === null ? 'bg-gray-200' : 'bg-white'
                  } ${
                    cellState === 'correct' ? 'bg-green-100' : 
                    cellState === 'incorrect' ? 'bg-red-100' : ''
                  } hover:z-10 hover:shadow-sm`}
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
                        <span className="absolute top-0 left-0 text-xs font-bold text-gray-600 leading-none p-0.5">
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
                        className="w-full h-full text-center text-uppercase font-mono border-none outline-none bg-transparent focus:bg-primary/10"
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
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
        <div className="flex gap-2">
          <Button onClick={handleCheckAnswers} className="gap-1">
            <CheckCircle className="h-4 w-4" /> Check Answers
          </Button>
          <Button onClick={handleResetPuzzle} variant="outline" className="gap-1">
            <RefreshCw className="h-4 w-4" /> Reset
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{completedWords.size}/{totalWords} words completed</span>
          <Progress value={(completedWords.size / totalWords) * 100} className="w-32 h-2" />
        </div>
      </div>
      
      {/* Status Message */}
      {status.type !== "hidden" && (
        <Alert 
          variant={status.type === "success" ? "default" : status.type === "error" ? "destructive" : "default"}
          className={`animate-fade-in ${
            status.type === "success" ? "bg-green-50 text-green-800 border-green-200" : 
            status.type === "error" ? "bg-red-50 text-red-800 border-red-200" : 
            "bg-yellow-50 text-yellow-800 border-yellow-200"
          }`}
        >
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}