import { useState } from "react";
import CrosswordGrid from "@/components/CrosswordGrid";
import CluesPanel from "@/components/CluesPanel";
import { gridData, words } from "@/lib/crosswordData";

export default function Crossword() {
  const [activeClue, setActiveClue] = useState(null);
  
  const [completedWords, setCompletedWords] = useState(new Set());
  const [status, setStatus] = useState({
    message: "",
    type: "hidden"
  });

  const totalWords = words.horizontal.length + words.vertical.length;
  
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
  };

  const checkAnswers = (correctCells, incorrectCells, emptyCells) => {
    if (incorrectCells === 0 && emptyCells === 0) {
      setStatus({
        message: "Поздравляем! Все ответы верны!",
        type: "success"
      });
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

  return (
    <div className="min-h-screen bg-background font-sans text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            CSS Animation Crossword Puzzle
          </h1>
          <p className="text-muted-foreground">
            Test your knowledge of CSS animations while enjoying interactive examples
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
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
      </div>
    </div>
  );
}