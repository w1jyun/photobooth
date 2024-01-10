import state from './state'
import step3 from './3.selectPhoto';
import { getImgSize } from './utils';

export default () => {
    step2();
}

const step2 = () =>{
    const msg = document.createElement('div');
    msg.id = 'stageMsg';
    msg.innerHTML = '촬영을 시작합니다'
    document.body.appendChild(msg);
    const videoContainer = document.createElement('div');
    const { width, height } = getImgSize(state.frameNum);
    videoContainer.style.width = `${width}px`;
    videoContainer.style.height = `${height}px`;
    videoContainer.style.top = '140px';
    videoContainer.style.left = '50%';
    videoContainer.style.position = 'absolute';
    videoContainer.style.overflow = 'hidden';
    videoContainer.style.marginLeft = `-${width/2}px`;

    const videoElem = document.createElement('video');
    videoElem.autoplay = 'true';
    videoElem.width = width;
    videoElem.height = height;
    // videoElem.videoWidth = width;
    // videoElem.videoHeight = height;
    // videoElem.style.width = '100%';
    // videoElem.style.height = `${height}px`;
    videoElem.style.position = 'absolute';
    // videoElem.style.left = `${-width * 0.5}px`;
    videoElem.id = 'videoElement';
    videoElem.style.objectFit = 'cover';
    videoElem.style.overflow = 'hidden';
    videoContainer.appendChild(videoElem);
    document.body.appendChild(videoContainer);

    const timerDiv = document.createElement('div');
    timerDiv.id = 'timer'
    timerDiv.style.position = 'absolute';

    document.body.appendChild(timerDiv);
    
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoElem.srcObject = stream;
                let time = 10
                timerDiv.innerText = time;
                let count = 0
                const intervalId = setInterval(()=>{
                    time -= 1;
                    timerDiv.innerHTML = time;
                    if (time == 0) {
                        takePhoto();
                        time = 10;
                        timerDiv.innerHTML = time;
                        count += 1;
                        if (count == 8) {
                            clearInterval(intervalId);
                            document.body.replaceChildren();
                            step3();
                        }
                    }
                }, 10);
            })
            .catch((err) => {
                window.alert('something went wrong');
            })
    }
}

const takePhoto = () => {
    // snap.currentTime = 0;
    // snap.play();
    const { width, height } = getImgSize(state.frameNum);
    const video = document.getElementById('videoElement');
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.translate(width, 0);
    context.scale(-1, 1);
    // canvas.getContext("2d").drawImage(video, 0, 0, width, height);
    canvas.getContext("2d").drawImage(video, 0, 0, width * 0.8, height * 0.8, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    state.dataURLs.push(dataURL);
}