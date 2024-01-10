import state from './state';
import step2 from './2.capture';
import { makeButton } from './utils';

export default () => {
    step1();
}

const changeCut = (opt) => {
    if (opt == state.frameNum) return;
    const prev = document.getElementById('cut'+state.frameNum);
    if (prev) prev.innerHTML = prev.innerHTML.slice(2,)

    const curr = document.getElementById('cut' + opt);
    curr.innerHTML = '☑️ '+ curr.innerHTML;
    state.frameNum = opt;
}

const step1 = () =>{
    // selct frame
    const msg = document.createElement('div');
    msg.id = 'stageMsg';
    msg.innerHTML = '프레임을 선택해주세요';
    document.body.appendChild(msg);

    const cutMenu = document.createElement('div');
    cutMenu.style.position = 'absolute';
    cutMenu.style.display = 'grid';
    cutMenu.style.gridTemplateColumns = '1fr 1fr 1fr 1fr';
    cutMenu.style.top = '120px';
    cutMenu.style.width = '1000px';
    cutMenu.style.left = '50%';
    cutMenu.style.marginLeft = '-600px';
    
    for (let i = 1; i <= 4; i+=1) {
        const cutContainer = document.createElement('div');
        cutContainer.style.gridTemplateRows = '1fr 4fr';
        const cut = document.createElement('div');
        cut.innerHTML =  i != 4 ? (i+1) + ' CUTS' : '4 CUTS';
        cut.className = 'cutMenu';
        cut.id = 'cut'+i;
        const cutImg = document.createElement('img');
        cutImg.src = '/assets/frame/frame'+ i + '.png'
        cutImg.style.height = '350px';
        cutContainer.style.margin = '20px';
        cutContainer.appendChild(cut);
        cutContainer.appendChild(cutImg);
        cutContainer.addEventListener('click', () => { changeCut(i); });
        cutMenu.appendChild(cutContainer)
    }
    const nextBtn = makeButton('Next', () => {
        if (state.frameNum == 0) return;
        document.body.replaceChildren();
        step2();
    });
    document.body.appendChild(cutMenu);
    document.body.appendChild(nextBtn);
}