//Упорядкувати масив у порядку зменшення методом вибору. 
//Надрукувати вхідний та вихідний масив.ВВ
//Застосувати функції 

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

// Функція для обміну значень місцями
const swap = (array, idx1, idx2)=> {
    const temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
}

// Функція для сортування масиву за зростанням методом вибору
const selectionSort = (array) => {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            swap(array, i, minIndex);
        }
    }
}


// рендер масивів
const render = (str, value) => {
    //пошук елемента для вставки
    const root = document.querySelector('#root')
    //вставка перебором
    root.insertAdjacentHTML('beforeend', `<p>${str}</p>
    <ul>
    ${value.map(item => (
        `<li>${item}</li>`
    )).join('')}
    </ul>`)
}

//додаємо слухач на форму
form.addEventListener('submit', (e) => {
    //забораняємо дефолтну поведінку браузера
    e.preventDefault();
    //шукаємо інпути
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
    // Копія вхідного масиву для збереження оригінального порядку
    const originalArray = [...arr];

    // Сортування методом вибору
    selectionSort(arr);

    // Виведення вхідного та відсортованого масивів
    console.log("Вхідний масив:", originalArray);
    console.log("Відсортований масив:", arr);
    render("Вхідний масив:", originalArray)
    render("Відсортований масив:", arr)
})
