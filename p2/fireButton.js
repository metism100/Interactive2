
const MAX_COLORS = 768;
const CHUNK = 3;
const GUTTER_LINES = 5;

function getColors() {

	const setColor = (colorArray, colorIndex, r, g, b) => {
		const baseIndex = colorIndex << 2;
		colorArray[baseIndex] = r;
		colorArray[baseIndex + 1] = g;
		colorArray[baseIndex + 2] = b;
		colorArray[baseIndex + 3] = 0xff;
	}

	const colors = new Uint8ClampedArray(256 * 3 * 4);
	for (let i = 0; i < 256; i++) {
		setColor(colors, i, i, 0, 0);
		setColor(colors, i + 256, 0xff, i, 0);
		setColor(colors, i + 512, 0xff, 0xff, i)
	}

	return colors;
}

function flipBuffers() {
	mainBuffer = 1 - mainBuffer;
	backBuffer = 1 - backBuffer;
}

function loop() {

	if (isGenerate) {
		for (let n = 0; n < canvas.width / CHUNK; n++) {
			const color = (Math.random() >= 0.4) ? (MAX_COLORS - 1) : 0;
			for (let c = 0; c < CHUNK; c++) {
				buffers[backBuffer][numPixels - n * CHUNK - c] = color;
			}
		}
	}

	for (let y = canvas.height - 1; y >= 1; y--) {
		for (let x = 1; x < canvas.width - 1; x++) {
			let sum = 0;
			const pixelIndex = y * canvas.width + x;
			sum += buffers[backBuffer][pixelIndex];
			sum += buffers[backBuffer][pixelIndex + canvas.width - 1];
			sum += buffers[backBuffer][pixelIndex + canvas.width];
			sum += buffers[backBuffer][pixelIndex + canvas.width + 1];
			sum /= 4;
			sum -= (1.0 - y / canvas.height) * 10.0;

			if (sum < 0) sum = 0;
			if (sum >= MAX_COLORS) sum = MAX_COLORS - 1;

			buffers[mainBuffer][pixelIndex] = sum;
		}
	}

	const skippedPixels = GUTTER_LINES * canvas.width;
	for (let i = 0; i < numPixels - skippedPixels; i++) {
		const baseTargetIndex = (skippedPixels + i) << 2;
		const baseSourceIndex = (buffers[mainBuffer][i]) << 2;
		fireImage.data[baseTargetIndex] = colors[baseSourceIndex];
		fireImage.data[baseTargetIndex + 1] = colors[baseSourceIndex + 1];
		fireImage.data[baseTargetIndex + 2] = colors[baseSourceIndex + 2];
		fireImage.data[baseTargetIndex + 3] = colors[baseSourceIndex + 3];
	}

	context.putImageData(fireImage, 0, 0);
	flipBuffers();
	window.requestAnimationFrame(loop);

}

const button = document.getElementById("button");
const canvas = document.getElementById("canvas");

canvas.width = button.clientWidth;
canvas.height = button.clientHeight;

const colors = getColors();
const context = canvas.getContext("2d");
const fireImage = context.createImageData(canvas.width, canvas.height);
const numPixels = fireImage.width * fireImage.height;
const buffers = [new Uint16Array(numPixels), new Uint16Array(numPixels)];

let mainBuffer = 0;
let backBuffer = 1;
let isGenerate = true;

button.addEventListener('click', () => {
	isGenerate = !isGenerate;
});
window.requestAnimationFrame(loop);
