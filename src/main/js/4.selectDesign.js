import state from './state';
import { getImgSize, makeButton } from './utils';
import { grayscaleFilter, brightnessFilter, colorEnhanceFilter } from './filters';
import step5 from './5.download';

const state = {
    bg: 0,
    filter: 0,
    originPixels: [],
}

const colors = [
// bgName, textColor, bgColor
    {name: 'black', textColor: 'white', bgColor: '#000000'},
    {name: 'white', textColor: 'black', bgColor: '#FFFFFF'},
    {name: 'pink', textColor: 'white', bgColor: 'rgb(245 188 188)'},
    {name: 'pink beige', textColor: 'white', bgColor: 'rgb(215 197 197)'},
    {name: 'blue', textColor: 'white', bgColor: 'rgb(100 150 213)'},
    {name: 'deep blue', textColor: 'white', bgColor: 'rgb(19 39 72)'},
    {name: 'skyblue', textColor: 'white', bgColor: 'rgb(188 224 245)'},
    {name: 'purple', textColor: 'white', bgColor: 'rgb(208 182 239)'},
    {name: 'light green', textColor: 'white', bgColor: 'rgb(194 228 160)'},
    {name: 'yellow', textColor: 'white', bgColor: 'rgb(255 224 132)'},
]

const filters = [
        {name: '원본', func: (pixels) => {return pixels}},
        {name: '밝게', func: brightnessFilter},
        {name: '흑백', func: grayscaleFilter},
        {name: '쨍하게', func: colorEnhanceFilter},
]
export default () => {
    step4();
}


const step4 = () =>{
    const msg = document.createElement('div');
    msg.id = 'stageMsg';
    msg.innerHTML = '필터와 배경을 선택해주세요'
    document.body.appendChild(msg);
    const preview = createPreview();
    const bgMenu = createBgMenu();
    const filterMenu = createFilterMenu();

    const nextBtn = makeButton('Next', () => {
        document.body.replaceChildren();
        step5();
    });

    document.body.appendChild(nextBtn);
}

const createFilterMenu = () => {
    const filterMenu = document.createElement('div');
    filterMenu.style.display = 'absolute';
    filterMenu.style.gridTemplateColumns = `repeat( ${filters.length}, 1fr)`;

    filters.forEach((filter, idx)=>{
        const option = document.createElement('div');
        option.innerText = filter.name;
        option.style.fontFamily = 'NEXON Lv1 Gothic OTF';
        option.style.textAlign = 'center';
        option.id = 'filter'+idx;
        option.style.margin = '10px';
        option.style.width = '100px';
        option.style.height = '100px';
        option.style.lineHeight = '100px';
        option.style.backgroundColor = idx != 0 ? 'white': 'gray';
        option.style.borderRadius = '30px';
        option.addEventListener('click', () => {selectFilter(idx)});
        filterMenu.appendChild(option);
    });

    filterMenu.style.position = 'absolute';
    filterMenu.style.bottom = '200px';
    filterMenu.style.right = '400px';
    filterMenu.style.width = '250px';
    filterMenu.style.display = 'grid';
    document.body.appendChild(filterMenu);

    return filterMenu;
}

const selectFilter = (idx) => {
    for (let i = 0; i < filters.length; i += 1) {
        if (i == idx) {
            document.querySelector('#filter' + i).style.backgroundColor = 'gray';
        } else {
            document.querySelector('#filter' + i).style.backgroundColor = 'white';
        }
    }

    const canvas = document.getElementsByClassName('cvs');
    Array.from(canvas).forEach((cvs, i)=>{
        const pixels = state.originPixels[i];
        const pixels_ = new ImageData(
            new Uint8ClampedArray(pixels.data),
            pixels.width,
            pixels.height
          )
        const filteredData = filters[idx].func(pixels_);
        const ctx = cvs.getContext('2d');
        ctx.putImageData(filteredData, 0 , 0);
    });
}

const changeBg = (dir) => {
    // change state
    state.bg += dir * 1;
    if (state.bg < 0) state.bg = colors.length - 1;
    if (state.bg >= colors.length) state.bg = 0;

    // change view
    const bgColorPreview = document.querySelector('#bgColorPreview');
    bgColorPreview.innerText = colors[state.bg].name;
    bgColorPreview.style.color = colors[state.bg].textColor;
    bgColorPreview.style.backgroundColor = colors[state.bg].bgColor;
    document.querySelector('#preview').style.backgroundColor = colors[state.bg].bgColor;
    document.querySelector('#logoText').style.color =  colors[state.bg].textColor;
}

const createBgMenu = () => {
    const bgMenu = document.createElement('div');
    const leftBtn = document.createElement('div');
    leftBtn.innerText = '◀︎';
    leftBtn.style.textAlign = 'center';
    leftBtn.style.height = '120px';
    leftBtn.style.lineHeight = '120px';
    leftBtn.color = 'gray';
    leftBtn.addEventListener('click', () => {changeBg(-1);})

    const rightBtn = document.createElement('div');
    rightBtn.innerText = '▶︎';
    rightBtn.style.textAlign = 'center';
    rightBtn.style.height = '120px';
    rightBtn.style.lineHeight = '120px';
    rightBtn.color = 'black';
    rightBtn.addEventListener('click', () => {changeBg(+1);})

    const bgColorPreview = document.createElement('div');
    bgColorPreview.id = 'bgColorPreview';
    bgColorPreview.innerText = colors[0].name;
    bgColorPreview.style.color = colors[0].textColor;
    bgColorPreview.style.backgroundColor = colors[0].bgColor;
    bgColorPreview.style.textAlign = 'center';
    bgColorPreview.style.fontFamily = 'NEXON Lv1 Gothic OTF';
    bgColorPreview.style.width = '120px';
    bgColorPreview.style.height = '120px';
    bgColorPreview.style.borderRadius = '60px';
    bgColorPreview.style.lineHeight = '120px';
    bgMenu.appendChild(leftBtn);
    bgMenu.appendChild(bgColorPreview);
    bgMenu.appendChild(rightBtn);
    bgMenu.style.position = 'absolute';
    bgMenu.style.top = '200px';
    bgMenu.style.right = '225px';
    bgMenu.style.width = '300px';
    bgMenu.style.display = 'grid';
    bgMenu.style.gridTemplateColumns = '60px 120px 60px';
    document.body.appendChild(bgMenu);

    return bgMenu;
}

const createPreview = () => {
    const preview = document.createElement('div');
    preview.id = 'preview';
    preview.style.backgroundColor = colors[state.bg].bgColor;
    preview.style.position = 'absolute';
    preview.style.left = '80px';
    const imgContainer = document.createElement('div');
    imgContainer.style.position = 'absolute';
    imgContainer.style.display = 'grid';

    const logoText = document.createElement('div');
    logoText.id = 'logoText';
    logoText.innerText = 'YUN\nFILM';
    logoText.style.color =  colors[state.bg].textColor;
    let frameW = 0;
    let frameH = 0;
    const { width: imgW, height: imgH } = getImgSize(state.frameNum);

    if (state.frameNum == 1) {
        frameW = 1200;
        frameH = 1800;
        imgContainer.style.gridTemplateRows = '1fr 1fr';
        imgContainer.style.top = '50px';
        imgContainer.style.left = '50%';
        imgContainer.style.marginLeft =  `${-(imgW * 0.15 + 5)}px`;
        logoText.style.width = '90px';
        logoText.style.height = '90px';
        logoText.style.left = '50%';
        logoText.style.marginLeft = '-45px';
        logoText.style.fontSize = '30';
        logoText.style.lineHeight = '30px';
        logoText.style.bottom = '10px';
    } else if (state.frameNum == 2) {
        frameW = 1000;
        frameH = 1800;    
        imgContainer.style.gridTemplateRows = '1fr 1fr 1fr'
        imgContainer.style.top = '5px';
        imgContainer.style.left = '50%';
        imgContainer.style.marginLeft =  `${-(imgW * 0.15 + 2.5)}px`;
        logoText.style.width = '60px';
        logoText.style.height = '60px';
        logoText.style.left = '50%';
        logoText.style.marginLeft = '-30px';
        logoText.style.fontSize = '18';
        logoText.style.lineHeight = '18px';
        logoText.style.bottom = '0px';
    } else if (state.frameNum == 3) {
        frameW = 1800;
        frameH = 1200;
        imgContainer.style.gridTemplateRows = '1fr 1fr'
        imgContainer.style.gridTemplateColumns = '1fr 1fr'
        imgContainer.style.top = '20px';
        imgContainer.style.left = '20px';
        logoText.style.width = '60px';
        logoText.style.height = '60px';
        logoText.style.fontSize = '25';
        logoText.style.lineHeight = '25px';
        logoText.style.top = '30px';
        logoText.style.right = '50px';
    } else if (state.frameNum == 4) {
        frameW = 600;
        frameH = 1800;
        imgContainer.style.gridTemplateRows = '1fr 1fr 1fr 1fr';
        imgContainer.style.left = '50%';
        imgContainer.style.marginLeft = `${-(imgW * 0.15 + 5)}px`;
        imgContainer.style.bottom = '15px';
        logoText.style.width = '60px';
        logoText.style.height = '60px';
        logoText.style.left = '50%';
        logoText.style.marginLeft = '-30px';
        logoText.style.fontSize = '20';
        logoText.style.lineHeight = '20px';
        logoText.style.top = '15px';
    } 

    preview.style.width = frameW * 0.3 + 'px';
    preview.style.height = frameH * 0.3 + 'px';
    preview.style.bottom = '50%';
    preview.style.marginBottom = -frameH * 0.15 + 'px';

    state.dataURLs.forEach((url, idx) => {
        if (!state.selectedIdx.has(idx)) return;
        const imgDiv = document.createElement('div');
        imgDiv.style.width = imgW * 0.3;
        imgDiv.style.height = imgH * 0.3;
        imgDiv.style.objectFit = 'cover';

        const img = new Image;
        img.src = url;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        img.onload = () => {
            ctx.drawImage(img, 0, 0, imgW, imgH);
            state.originPixels.push(ctx.getImageData(0,0, imgW, imgH))
        };
        canvas.className = 'cvs';
        canvas.width = imgW;
        canvas.height = imgH;
        canvas.style.width = `${imgW * 0.3}px`;
        canvas.style.height = `${imgH * 0.3}px`;
        canvas.style.objectFit = 'cover';

        canvas.style.margin = state.frameNum == 1 || state.frameNum == 4 ? '5px': '2.5px';
        imgDiv.appendChild(canvas);
        imgContainer.appendChild(imgDiv);
    });

    preview.appendChild(imgContainer);
    preview.appendChild(logoText);
    document.body.appendChild(preview);

    return preview;
}
