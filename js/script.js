let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let T = 0
let X0 = 0
let Y0 = canvas.height
let X = X0
let Y = Y0
let g = 0.0005

let oldTimeStamp = 0
let secondsPassed = 0

let run = false

let angle = document.getElementById('angle')
let speed = document.getElementById('speed')
let animationSpeed = document.getElementById('animation_speed')
let start = document.getElementById('start')
let reset = document.getElementById('reset')

start.addEventListener('click', stopMotion)
reset.addEventListener('click', resetMotion)

function stopMotion() {
	if (!run) {
		start.value = 'stop'
	} else {
		start.value = 'start'
	}
	run = !run
}

function resetMotion() {
	if (!run) {
		start.value = 'start'
	} else {
		start.value = 'stop'
	}
	X = X0
	Y = Y0
	T = 0
}

window.onload = init()

function init() {
	requestAnimationFrame(projectileMove)
}

function projectileMove(timeStamp) {
	secondsPassed = (timeStamp - oldTimeStamp) / 1000
	oldTimeStamp = timeStamp
	update()
	draw()
	requestAnimationFrame(projectileMove)
}

function update() {
	if (run) {
		T += animationSpeed.value * secondsPassed
		X = speed.value * Math.cos(-angle.value * Math.PI / 180) * T + X0
		Y = 0.5 * g * T * T + speed.value * Math.sin(-angle.value * Math.PI / 180) * T + Y0
	}
}

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.beginPath();
	context.arc(X, Y, 15, 0, 2 * Math.PI);
	context.fill();

	context.fillText('Angle: ' + angle.value, 30, 30);
	context.fillText('Speed: ' + speed.value, 30, 50);
	context.fillText('Animation Speed: ' + animationSpeed.value, 30, 70);

	context.beginPath();
	context.moveTo(X0, Y0);
	context.strokeStyle = '#000';
	context.lineTo(X0 + 80 * Math.cos(angle.value * Math.PI / 180), Y0 - 80 * Math.sin(angle.value * Math.PI / 180));
	context.lineWidth = 40;
	context.stroke()
}