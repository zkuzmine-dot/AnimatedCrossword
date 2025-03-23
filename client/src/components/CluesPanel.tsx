import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimationExamples from "@/components/AnimationExamples";

interface Word {
  word: string;
  clue: string;
  row: number;
  col: number;
}

interface CluesPanelProps {
  words: {
    horizontal: Word[];
    vertical: Word[];
  };
  activeClue: {
    direction: string;
    row: number;
    col: number;
    word: string;
  } | null;
  setActiveClue: (clue: {
    direction: string;
    row: number;
    col: number;
    word: string;
  } | null) => void;
}

export default function CluesPanel({ words, activeClue, setActiveClue }: CluesPanelProps) {
  const [activeTab, setActiveTab] = useState("horizontal");

  const handleClueClick = (direction: string, row: number, col: number, word: string) => {
    setActiveClue({ direction, row, col, word });
  };

  return (
    <div className="w-full lg:w-2/5 bg-white rounded-lg shadow-md p-4 overflow-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-primary">Clues</h2>
        
        <Tabs defaultValue="horizontal" onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="horizontal" className="flex-1">Horizontal</TabsTrigger>
            <TabsTrigger value="vertical" className="flex-1">Vertical</TabsTrigger>
          </TabsList>
          
          <TabsContent value="horizontal" className="space-y-2">
            {words.horizontal.map((wordObj, index) => (
              <div 
                key={`horizontal-${index}`}
                className={`p-2 rounded cursor-pointer transition-colors hover:bg-gray-100 ${
                  activeClue && 
                  activeClue.direction === 'horizontal' && 
                  activeClue.row === wordObj.row && 
                  activeClue.col === wordObj.col ? 
                  'bg-primary/10 font-medium' : ''
                }`}
                onClick={() => handleClueClick('horizontal', wordObj.row, wordObj.col, wordObj.word)}
              >
                <span className="font-semibold">{index + 1}.</span> {wordObj.clue}
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="vertical" className="space-y-2">
            {words.vertical.map((wordObj, index) => (
              <div 
                key={`vertical-${index}`}
                className={`p-2 rounded cursor-pointer transition-colors hover:bg-gray-100 ${
                  activeClue && 
                  activeClue.direction === 'vertical' && 
                  activeClue.row === wordObj.row && 
                  activeClue.col === wordObj.col ? 
                  'bg-primary/10 font-medium' : ''
                }`}
                onClick={() => handleClueClick('vertical', wordObj.row, wordObj.col, wordObj.word)}
              >
                <span className="font-semibold">{index + 1}.</span> {wordObj.clue}
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
      <AnimationExamples />
    </div>
  );
}
