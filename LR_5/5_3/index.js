//Реалізувати можливість перегляду зображень за таймером, 
//врахувати можливість налаштування розміру зображень, 
//циклічність перегляду, а також часу між переключеннями. 

//пошук контейнера картинок
const imagesWrapper = document.querySelector('.images-wrapper');

//пошук кнопки продовження
const btnResume = document.getElementById('resume');

//пошук кнопки зупинення таймера
const pauseBtn = document.getElementById('stop');

//пошук вивода таймера
const timer = document.getElementById('timer');

//пошук форми
const form = document.querySelector('#form');

//початковий таймер
let timeToNext = 3000;

//час до наступної картинки
let leftToNext = timeToNext;

//індекс для відображення
let curImgIndex = 0;

//змінна для створення інтервала
let interval = createInterval();

//зміна розміру картинки
const changeSize = (data) => {
    if(!data){
        return
    }
    const img = imagesWrapper.querySelectorAll('img')
    img.forEach((img) => {
        img.style.width = `${data}px`
        img.style.height = `${data}px`
    })
}

//зміна наявності таймеру
const changeSwitches = (data) => {
if(data){
    timer.closest('div').style.display = 'block'
   
    //створення нового інтервалу
    interval = createInterval()
}
if(!data){
    timer.closest('div').style.display = 'none'
    clearInterval(interval)
}
}

//зміна таймеру
const changeTime = (data) => {
    if(!data){
        return
    }
    timeToNext = data * 1000
    leftToNext = timeToNext
    clearInterval(interval)
    //створення нового інтервалу
    interval = createInterval()
}


//обробка форми
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    //шукаємо інпути
    const inputs = form.querySelectorAll('input');
    //шукаємо селект
    const selects = form.querySelectorAll('select');

    //створюємо обєкт методом редус для інпутів
    const inputObj = [...inputs].reduce((acc, cur) => {
        if (cur.name) {
            acc[cur.name] = +cur.value;
            return acc
        }
        return acc
    }, {});

    //створюємо обєкт методом редус для селектів
    const selectObj = [...selects].reduce((acc, cur) => {
        if (cur.name) {
            acc[cur.name] = cur.value === "true";
            return acc
        }
        return acc
    }, {});

    //обєднуємо обєкти
    const formData = {...inputObj, ...selectObj}

    //запускаєм функції для змін
    changeSize(formData.size)
    changeTime(formData.time)
    changeSwitches(formData.switch)
})


//обробник події відновлення таймера
btnResume.addEventListener('click', () => {
    //очищення інтервалу
    clearInterval(interval)
    //створення нового інтервалу
    interval = createInterval()
})

//обробник події зупинення таймера
pauseBtn.addEventListener('click', () => clearInterval(interval))

//створення таймера для переключення 
function createInterval() {
    return setInterval(() => {
        leftToNext -= 10;
        if (leftToNext <= 0) {
            leftToNext = timeToNext;
            goToNextImg();
        }
        //вивід на екран таймера
        timer.textContent = (leftToNext / 1000).toFixed(3);
    }, 10)
}

//перемикання слайдів 
function goToNextImg() {
    imagesWrapper.children[curImgIndex].hidden = true;
    curImgIndex++;
    if (curImgIndex === imagesWrapper.children.length) {
        curImgIndex = 0;
    }
    imagesWrapper.children[curImgIndex].hidden = false;
}