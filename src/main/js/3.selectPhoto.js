import state from './state'
import step4 from './4.selectDesign';
import { getCutNum, getImgSize, makeButton } from './utils';

export default () => {
    step3();
}

const step3 = () => {
    const msg = document.createElement('div');
    msg.id = 'stageMsg';
    msg.innerHTML = '사진을 선택해주세요'
    document.body.appendChild(msg);
    const imgContainer = document.createElement('div');
    imgContainer.style.display = 'grid';
    imgContainer.style.position = 'absolute';
    const { width, height } = getImgSize(state.frameNum);
    const imgW = width * 0.4;
    const imgH = height * 0.4;
    imgContainer.style.width = `${imgW * 4}px`;
    imgContainer.style.top = '130px';
    imgContainer.style.left = '50%';
    imgContainer.style.marginLeft = `-${imgW * 2}px`;
    imgContainer.style.gridTemplateColumns = '1fr 1fr 1fr 1fr';
    imgContainer.style.gridTemplateRows = '1fr 1fr';
    state.dataURLs.forEach((url, idx) => {
        const img = new Image;
        img.src = url;
        img.width = imgW;
        img.height = imgH;
        img.style.width = imgW;
        img.style.height = imgH;
        img.style.margin = '5px';
        img.id = 'img' + idx;
        img.style.border = '3px solid rgb(249, 243, 243)';
        img.addEventListener('click', () => {selectPhotos(idx);})
        imgContainer.appendChild(img);
        // 5 * 4
    })

    const nextBtn = makeButton('Next', () => {
        const cutNum = getCutNum(state.frameNum);
        if (state.selectedIdx.size != cutNum){
            window.alert('사진을 ' + cutNum + '장 선택하세요');
            return;
        }
        document.body.replaceChildren();
        step4();
    });

    document.body.appendChild(imgContainer);
    document.body.appendChild(nextBtn);
}


const selectPhotos = (idx) => {
    if (state.selectedIdx.has(idx)) {
        state.selectedIdx.delete(idx);
        document.querySelector('#img'+idx).style.border = '3px solid rgb(249, 243, 243)';
    } else if (state.selectedIdx.size < getCutNum(state.frameNum)) {
        state.selectedIdx.add(idx);
        document.querySelector('#img'+idx).style.border = '3px solid #da9090';
    }
}