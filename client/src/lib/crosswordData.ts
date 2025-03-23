// Crossword grid data (13x21 - columns x rows)
export const gridData = [
  [null, null, null, null, null, null, null, "L", "O", "A", "D", "E", "R"],
  [null, "K", null, null, null, null, null, null, "P", null, null, null, null],
  [null, "E", null, null, null, null, null, null, "A", null, null, null, null],
  [null, "Y", null, null, null, null, null, null, "C", null, null, null, null],
  [null, "F", null, "T", "R", "A", "N", "S", "I", "T", "I", "O", "N"],
  [null, "R", null, "I", null, "J", null, null, "T", null, null, null, null],
  [null, "A", null, "M", null, "A", null, null, "Y", null, null, null, null],
  [null, "M", null, "I", null, "V", null, null, null, null, null, null, null],
  ["T", "E", "A", "N", "S", "I", "T", "I", "O", "N", "E", "N", "D"],
  [null, "S", null, "G", null, "S", null, null, null, null, null, null, null],
  [null, null, null, "F", null, "C", null, null, null, null, null, null, null],
  [null, null, null, "U", null, "R", null, null, null, null, null, null, null],
  [null, null, null, "N", null, "I", null, null, null, null, null, null, null],
  [null, null, null, "C", null, "P", null, null, null, null, null, null, null],
  [null, null, null, "T", "R", "A", "N", "S", "F", "O", "R", "M", null],
  [null, null, null, "I", null, "T", null, null, null, null, null, null, null],
  [null, null, null, "O", null, null, null, null, null, null, null, null, null],
  [null, null, null, "N", null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, "I", "N", "F", "I", "N", "I", "T", "E"],
  [null, null, null, null, null, "P", null, null, null, null, null, null, null],
  [null, null, null, null, null, "T", null, null, null, null, null, null, null]
];

// Crossword clues and answers
export const words = {
  horizontal: [
    { 
      word: "LOADER", 
      clue: "Пример анимированного элемента, показывающего загрузку.", 
      row: 0, 
      col: 7 
    },
    { 
      word: "TRANSITION", 
      clue: "Свойство CSS для плавного изменения значений (например, цвета) за указанное время.", 
      row: 4, 
      col: 3 
    },
    { 
      word: "TRANSITIONEND", 
      clue: "Событие JavaScript, срабатывающее при завершении CSS-перехода.", 
      row: 8, 
      col: 0 
    },
    { 
      word: "OPACITY", 
      clue: "Свойство, которое анимируют для создания эффекта 'исчезновения'.", 
      row: 4, 
      col: 8 
    },
    { 
      word: "TRANSFORM", 
      clue: "Свойство, которое используют для перемещения или вращения элемента.", 
      row: 14, 
      col: 3 
    },
    { 
      word: "INFINITE", 
      clue: "Значение, чтобы анимация повторялась бесконечно.", 
      row: 18, 
      col: 6 
    }
  ],
  vertical: [
    { 
      word: "KEYFRAMES", 
      clue: "Правило CSS для создания сложных анимаций с промежуточными состояниями.", 
      row: 1, 
      col: 1 
    },
    { 
      word: "TIMINGFUNCTION", 
      clue: "Функция, задающая скорость анимации (например, ease или linear).", 
      row: 4, 
      col: 3 
    },
    { 
      word: "JAVASCRIPT", 
      clue: "Язык, которым управляют анимациями (например, запуск через классы).", 
      row: 5, 
      col: 5 
    }
  ]
};
