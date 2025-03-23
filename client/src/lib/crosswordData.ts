// Crossword grid data (13x21 - columns x rows)
export const gridData = [
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
      word: "TRANSFORM", 
      clue: "Свойство, которое используют для перемещения или вращения элемента.", 
      row: 14, 
      col: 3 
    },
    { 
      word: "INFINITE", 
      clue: "Значение, чтобы анимация повторялась бесконечно.", 
      row: 18, 
      col: 5 
    }
  ],
  vertical: [
    { 
      word: "OPACITY", 
      clue: "Свойство, которое анимируют для создания эффекта 'исчезновения'.", 
      row: 0, 
      col: 8 
    },
    { 
      word: "KEYFRAMES", 
      clue: "Правило CSS для создания сложных анимаций с промежуточными состояниями.", 
      row: 4, 
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
      row: 11, 
      col: 5 
    }
  ]
};
