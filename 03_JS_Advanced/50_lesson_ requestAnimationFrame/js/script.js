const btn = document.querySelector('.btn'),
	elem = document.querySelector('.box');  
let pos = 0;

// function myAnimation() {
//     let pos = 0;

//     const id = setInterval(frame, 10);
//     function frame() {
//         if (pos == 300) {
//             clearInterval(id);
//         } else {
//             pos++;
//             elem.style.top = pos + "px";
//             elem.style.left = pos + 'px';
//         }
//     }
// }

// более продвнутая функция, которая подстраивается под частоту обновления экрана, экономит ресурсы браузера 
function myAnimation() {
	pos++;
	elem.style.top = pos + 'px';
	elem.style.left = pos + 'px';

	if (pos < 300) {
		requestAnimationFrame(myAnimation); // requestAnimationFrame() отвечает за запуск анимации, она внутри себя зацикливает анимацию и выполняет её 300 раз
	}
}
btn.addEventListener('click', () => requestAnimationFrame(myAnimation)); // используем стрелочную функцию, так как просто вызов анимации выполнится не после клика, а сразу же, а нам нужен коллбэк по клику!!!

let id = requestAnimationFrame(myAnimation); // можно создать уникальный идентификатор анимации
cancelAnimationFrame(id); // можно отменить присвоение уникального идентификатора анимации