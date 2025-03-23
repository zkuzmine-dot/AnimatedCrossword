// Структура сетки кроссворда 13x21
// Заполняем null для пустых клеток, и правильными буквами для заполняемых клеток
export const gridData = [
  [null, null, null, null, null, null, null, "L", "O", null, null, null, null], // 0
  [null, null, null, null, null, null, null, "O", "P", null, null, null, null], // 1
  [null, null, null, null, null, null, null, "A", "A", null, null, null, null], // 2
  [null, null, null, null, null, null, null, "D", "C", null, null, null, null], // 3
  [null, "K", null, "T", "R", "A", "N", "S", "I", "T", "I", "O", "N"], // 4
  [null, "E", null, "I", null, null, null, "R", "T", null, null, null, null], // 5
  [null, "Y", null, "M", null, null, null, null, "Y", null, null, null, null], // 6
  [null, "F", null, "I", null, null, null, null, null, null, null, null, null], // 7
  ["T", "R", "A", "N", "S", "I", "T", "I", "O", "N", "E", "N", "D"], // 8
  [null, "A", null, "G", null, null, null, null, null, null, null, null, null], // 9
  [null, "M", null, "F", null, null, null, null, null, null, null, null, null], // 10
  [null, "E", null, "U", null, "J", null, null, null, null, null, null, null], // 11
  [null, "S", null, "N", null, "A", null, null, null, null, null, null, null], // 12
  [null, null, null, "C", null, "V", null, null, null, null, null, null, null], // 13
  [null, null, null, "T", "R", "A", "N", "S", "F", "O", "R", "M", null], // 14
  [null, null, null, "I", null, "S", null, null, null, null, null, null, null], // 15
  [null, null, null, "O", null, "C", null, null, null, null, null, null, null], // 16
  [null, null, null, "N", null, "R", null, null, null, null, null, null, null], // 17
  [null, null, null, null, null, "I", "N", "F", "I", "N", "I", "T", "E"], // 18
  [null, null, null, null, null, "P", null, null, null, null, null, null, null], // 19
  [null, null, null, null, null, "T", null, null, null, null, null, null, null]  // 20
];

// Слова с их подсказками и координатами начала слова
export const words = {
  horizontal: [
    {
      word: "LOADER",
      clue: "Анимированный элемент, который показывается во время загрузки данных с сервера",
      row: 0,
      col: 7
    },
    {
      word: "TRANSITION",
      clue: "CSS свойство, которое позволяет плавно анимировать изменение значений других свойств",
      row: 4,
      col: 3
    },
    {
      word: "TRANSITIONEND",
      clue: "JavaScript событие, которое срабатывает по окончанию CSS transition",
      row: 8,
      col: 0
    },
    {
      word: "TRANSFORM",
      clue: "CSS свойство, которое позволяет вращать, масштабировать, наклонять или перемещать элемент",
      row: 14,
      col: 3
    },
    {
      word: "INFINITE",
      clue: "Значение animation-iteration-count, которое заставляет анимацию повторяться бесконечно",
      row: 18,
      col: 5
    }
  ],
  vertical: [
    {
      word: "OPACITY",
      clue: "CSS свойство, которое управляет прозрачностью элемента (часто анимируется)",
      row: 0,
      col: 8
    },
    {
      word: "KEYFRAMES",
      clue: "Правило @, которое определяет промежуточные шаги анимации",
      row: 4,
      col: 1
    },
    {
      word: "TIMINGFUNCTION",
      clue: "Свойство transition или animation, определяющее скорость анимации в разные моменты времени",
      row: 4,
      col: 3
    },
    {
      word: "JAVASCRIPT",
      clue: "Язык программирования, который можно использовать для создания сложных анимаций",
      row: 11,
      col: 5
    }
  ]
};