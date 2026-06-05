const audio = document.getElementById('bgMusic');
const btn = document.getElementById('musicBtn');

if (btn && audio) {
    btn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            btn.innerText = "Tắt nhạc nền";
            btn.classList.add('playing');
        } else {
            audio.pause();
            btn.innerText = "Mở nhạc nền";
            btn.classList.remove('playing');
        }
    });
}

const wakeUpAudio = () => {
    if (audio && audio.paused) {
        audio.play().then(() => {
            btn.innerText = "Tắt nhạc nền";
            btn.classList.add('playing');
            window.removeEventListener('click', wakeUpAudio);
            window.removeEventListener('scroll', wakeUpAudio);
        }).catch(() => {});
    }
};
window.addEventListener('click', wakeUpAudio);
window.addEventListener('scroll', wakeUpAudio);

const sliderWrapper = document.getElementById('videoSlider');
const iframe = document.getElementById('reviewIframe');
const statusText = document.getElementById('videoStatus');

let videoList = [];
if (sliderWrapper) {
    const data = sliderWrapper.getAttribute('data-videos');
    if (data) {
        videoList = data.split(',').map(v => v.trim()); 
    }
}

let currentIndex = 0;

function updateVideo() {
    if (iframe && videoList.length > 0) {
        iframe.src = `https://www.youtube.com/embed/${videoList[currentIndex]}?rel=0`;
        
        if (statusText) {
            statusText.innerText = `Video ${currentIndex + 1} / ${videoList.length}`;
        }
    }
}

window.nextVideo = function() {
    if (videoList.length === 0) return;
    currentIndex = (currentIndex + 1) % videoList.length;
    updateVideo();
};

window.prevVideo = function() {
    if (videoList.length === 0) return;
    currentIndex = (currentIndex - 1 + videoList.length) % videoList.length;
    updateVideo();
};

if (videoList.length > 0) {
    updateVideo();
}