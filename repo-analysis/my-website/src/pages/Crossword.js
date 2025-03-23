import React, { useState } from "react";
import "../styles/Crossword.css";

function Crossword() {
    const grid = [
        [null, null, null, null, null, null, null, "L", "O", "A", "D", "E", "R"],
        [null, null, null, null, null, null, null, null, "P", null, null, null, null],
        [null, null, null, null, null, null, null, null, "A", null, null, null, null],
        [null, null, null, null, null, null, null, null, "C", null, null, null, null],
        [null, "K", null, "T", "R", "A", "N", "S", "I", "T", "I", "O", "N"],
        [null, "E", null, "I", null, null, null, null, "T", null, null, null, null],
        [null, "Y", null, "M", null, null, null, null, "Y", null, null, null, null],
        [null, "F", null, "I", null, null, null, null, null, null, null, null, null],
        ["T", "R", "A", "N", "S", "I", "T", "I", "O", "N", "E", "N", "D"],
        [null, "A", null, "G", null, null, null, null, null, null, null, null, null],
        [null, "M", null, "F", null, null, null, null, null, null, null, null, null],
        [null, "E", null, "U", null, "J", null, null, null, null, null, null, null],
        [null, "S", null, "N", null, "A", null, null, null, null, null, null, null],
        [null, null, null, "C", null, "V", null, null, null, null, null, null, null],
        [null, null, null, "T", "R", "A", "N", "S", "F", "O", "R", "M", null],
        [null, null, null, "I", null, "S", null, null, null, null, null, null, null],
        [null, null, null, "O", null, "C", null, null, null, null, null, null, null],
        [null, null, null, "N", null, "R", null, null, null, null, null, null, null],
        [null, null, null, null, null, "I", "N", "F", "I", "N", "I", "T", "E"],
        [null, null, null, null, null, "P", null, null, null, null, null, null, null],
        [null, null, null, null, null, "T", null, null, null, null, null, null, null]
    ];

    const questions = [
        { number: 1, row: 4, col: 3, direction: "Горизонтально", text: "Свойство CSS для плавного изменения значений.", length: 10 },
        { number: 2, row: 8, col: 0, direction: "Горизонтально", text: "Событие JS, срабатывающее при завершении CSS-перехода.", length: 12 },
        { number: 3, row: 15, col: 3, direction: "Горизонтально", text: "Свойство, используемое для трансформации элемента.", length: 7 },
        { number: 4, row: 19, col: 5, direction: "Горизонтально", text: "Значение, чтобы анимация повторялась бесконечно.", length: 8 },

        { number: 5, row: 4, col: 1, direction: "Вертикально", text: "CSS-правило для сложных анимаций.", length: 5 },
        { number: 6, row: 5, col: 1, direction: "Вертикально", text: "Язык, которым управляют анимациями.", length: 10 },
        { number: 7, row: 5, col: 1, direction: "Вертикально", text: "Язык, которым управляют анимациями.", length: 10 },
        { number: 8, row: 5, col: 1, direction: "Вертикально", text: "Язык, которым управляют анимациями.", length: 10 },
        { number: 9, row: 5, col: 1, direction: "Вертикально", text: "Язык, которым управляют анимациями.", length: 10 },
    ];

    const [userInput, setUserInput] = useState(grid.map(row => row.map(cell => (cell ? "" : null))));
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [wordInput, setWordInput] = useState("");

    const handleChange = (e, rowIdx, colIdx) => {
        const value = e.target.value.toUpperCase();
        if (value.length > 1) return;
        const newUserInput = [...userInput];
        newUserInput[rowIdx][colIdx] = value;
        setUserInput(newUserInput);
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
        setWordInput("");
    };

    const handleWordInput = (e) => {
        setWordInput(e.target.value.toUpperCase().slice(0, selectedQuestion.length));
    };

    const handleWordSubmit = () => {
        if (selectedQuestion) {
            const newUserInput = [...userInput];

            for (let i = 0; i < wordInput.length; i++) {
                const row = selectedQuestion.row + (selectedQuestion.direction === "Вертикально" ? i : 0);
                const col = selectedQuestion.col + (selectedQuestion.direction === "Горизонтально" ? i : 0);

                if (row < grid.length && col < grid[0].length) {
                    newUserInput[row][col] = wordInput[i];
                }
            }

            setUserInput(newUserInput);
            setSelectedQuestion(null);
            setWordInput("");
        }
    };

    return (
        <div className="crossword-container">
            <h1 className="crossword-title">Кроссворд</h1>

            <div className="crossword-content">
                <div className="crossword-grid">
                    {grid.map((row, rowIdx) => (
                        <div key={rowIdx} className="crossword-row">
                            {row.map((cell, colIdx) => (
                                <div key={colIdx} className="crossword-cell">
                                    {cell && (
                                        <input
                                            type="text"
                                            maxLength="1"
                                            value={userInput[rowIdx][colIdx] || ""}
                                            onChange={e => handleChange(e, rowIdx, colIdx)}
                                            className={selectedQuestion && rowIdx >= selectedQuestion.row &&
                                            colIdx >= selectedQuestion.col &&
                                            ((selectedQuestion.direction === "Горизонтально" && colIdx < selectedQuestion.col + selectedQuestion.length) ||
                                                (selectedQuestion.direction === "Вертикально" && rowIdx < selectedQuestion.row + selectedQuestion.length))
                                                ? "selected" : ""}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="questions">
                    <h2>Вопросы:</h2>
                    {questions.map(q => (
                        <p key={q.number} onClick={() => handleQuestionClick(q)} className="question">
                            <strong>{q.number}. {q.direction}:</strong> {q.text}
                        </p>
                    ))}

                    {selectedQuestion && (
                        <div className="word-input">
                            <input type="text" value={wordInput} onChange={handleWordInput} />
                            <button onClick={handleWordSubmit}>Ввести</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Crossword;
