import step1 from './1.selectFrame';

export default () => {
    init();
}

const init = () =>{
    initSnow(); 
    initBackground();
    initEvent();
}

const initSnow = () => {
    for (let i = 0; i < 200; i++) {
        $('<div class="snow"></div>').appendTo('body');
      }
    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    const snowElements = document.getElementsByClassName('snow');
    Array.from(snowElements).forEach(element => {
        element.style.setProperty('--snow-color', getRandomColor());
    });
}

const initBackground = () =>{
    document.body.style.backgroundSize = '100%';
    document.body.style.backgroundColor = 'rgb(91 16 4)';

    const logo = document.createElement('div');
    logo.innerHTML = 'YUN FILM';
    logo.id = 'logo';
    document.body.appendChild(logo)

    const message = document.createElement('div');
    message.innerHTML = '화면을 클릭해주세요';
    message.id = 'msg';
    document.body.appendChild(message)
}

const clickCallback = () => {
    // next window
    document.body.style.backgroundColor = 'rgb(249 243 243)';
    window.removeEventListener('click', clickCallback);
    document.body.replaceChildren();
    step1();
}

const initEvent  = () => {
    window.addEventListener('click', clickCallback);
}

