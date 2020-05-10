const aaaaa = document.querySelectorAll('.a');
const pixels = new Array(aaaaa.length);

navigator.getUserMedia = (
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia
);

const init = () => {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(start)
    .catch(e => console.log(e.name + ": "+ e.message));
}

const initLegacy = () => {
  navigator.getUserMedia({video: true}, start, (e) => e);
}



function start(stream) {
  const video = setupVideo(stream);
  const ctx = setupCanvas();

  function draw() {
    ctx.drawImage(video, 0, 0, 66, 50);
    const result = ctx.getImageData(8, 0, 50, 50).data;
    let darkest;
    let lightest;
    for(let i = 0; i < result.length / 4; i++) {
      const j = i * 4;
      const v = 0.2126 * result[j] + 0.7152 * result[j + 1] + 0.0722 * result[j + 2];
      darkest = typeof darkest === 'number' ? Math.max(darkest, v) : v;
      lightest = typeof lightest === 'number' ? Math.min(lightest, v) : v;
      pixels[i] = v;
    }

    for(let i = 0; i < aaaaa.length; i++) {
      aaaaa[i].style.fontWeight = getFontWeight(pixels[i], darkest, lightest);
    }

    requestAnimationFrame(draw);
  }

  draw();
}

const VID_WIDTH = 66;
const VID_HEIGHT = 50;

function setupCanvas() {
  const c = document.createElement('canvas');
  c.width = VID_WIDTH;
  c.height = VID_HEIGHT;
  return c.getContext('2d');
}

function setupVideo(src) {
  const v = document.createElement('video');
  v.width = VID_WIDTH;
  v.height = VID_HEIGHT;
  v.autoplay = true;
  v.srcObject = src;
  v.style.position = 'absolute';
  v.style.left = 0;
  v.style.bottom = 0;
  v.style.width = '1px';
  v.style.height = '1px';
  v.style.opacity = 0;
  document.body.appendChild(v);
  return v;
}

function getFontWeight(b, darkest, lightest) {
  const delta = darkest - lightest;
  const step = delta / 9;
  if(b < lightest + step) return 900;
  if(b < lightest + 2 * step) return 800;
  if(b < lightest + 3 * step) return 700;
  if(b < lightest + 4 * step) return 600;
  if(b < lightest + 5 * step) return 500
  if(b < lightest + 6 * step) return 400;
  if(b < lightest + 7 * step) return 300;
  if(b < lightest + 8 * step) return 200;
  return 100;
}