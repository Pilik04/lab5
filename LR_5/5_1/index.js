//Створити одновимірний масив, 
//кількість елементів якого задана користувачем.
// Визначити максимальне та мінімальне значення
// серед елементів із парними та непарними номерами.

//Пошук форми в html
const form = document.querySelector('#form');

//функція рендомного формування числа -передаєм мінімум та максимум - генерується число від 0 до 1 берем мін та макс та округлюємо
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Створення масиву та повернення його - перебираємо з нуля(0 індекс масиву), по введенне число користувача
const createArray = (formData) => {
    const arr = [];
    for (let i = 0; i < formData.number; i++) {
        arr.push(getRandomNumber(formData.min, formData.max));
    }
    return arr;
}

//функія пошуку  максимальног та мінімальног значення
// серед елементів із парними та непарними номерами.
const findValue = (array) => {
    let minEven = Infinity;
    let maxEven = -Infinity;
    let minOdd = Infinity;
    let maxOdd = -Infinity;
    let minEvenIndex = Infinity;
    let maxEvenIndex = -Infinity;
    let minOddIndex = Infinity;
    let maxOddIndex = -Infinity;
   
    // Перегляд масиву та знаходження мінімального та максимального значень для парних та непарних індексів
    for (let i = 0; i < array.length; i++) {
        if (i % 2) {// Непарний індекс
            
            if (array[i] < minOdd) {
                minOdd = array[i];
                minOddIndex= i
            }
            if (array[i] > maxOdd) {
                maxOdd = array[i];
                maxOddIndex = i
            }
        } else {// Перевірка на парний індекс
            if (array[i] < minEven) {
                minEven = array[i];
                minEvenIndex = i
            }
            if (array[i] > maxEven) {
                maxEven = array[i];
                maxEvenIndex = i
            }
        }
    }
    //повернення обєкта для відображення
    return ({
        [`min value even index № ${minEvenIndex}`]: minEven,
        [`max value even index № ${maxEvenIndex}`]: maxEven,
        [`min value odd index № ${minOddIndex}`]: minOdd,
        [`max value odd index № ${maxOddIndex}`]: maxOdd
    })
}

// рендер масивів
const render = (value) => {
    //пошук елемента для вставки
    const root = document.querySelector('#root')
    //вставка перебором
    const arr = Object.entries(value)
    root.insertAdjacentHTML('beforeend', `<ul>
    ${arr.map(item => (
        `<li>${item[0]}: ${item[1]}</li>`
    )).join('')}
    </ul>`)
}

//додаємо слухач на форму
form.addEventListener('submit', (e) => {
    //забораняємо дефолтну поведінку браузера
    e.preventDefault();
    const inputs = form.querySelectorAll('input');
    //створюємо обєкт методом редус
    const formData = [...inputs].reduce((acc, cur) => {
        if (cur.name) {
            acc[cur.name] = +cur.value;
            return acc
        }
        return acc
    }, {});
    
    //виклик функції створення масиву
    const arr = createArray(formData)
    //пошук значень
    const value = findValue(arr)
     // Виведення обєкту
    render(value)
})
