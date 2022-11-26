/*
  performance.now();
  브라우저가 로딩된 순간부터 해당구문이  호출된 시점까지의 시간을 ms단위로 반환
  정밀한 시간계산이 필요할때 활용
*/

const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
	anime(box, {
		prop: 'margin-top',
		value: 300,
		duration: 500,
	});
});

function anime(selector, option) {
	const startTime = performance.now();
	requestAnimationFrame(move);

	function move(time) {
		const timelast = time - startTime;
		let progress = timelast / option.duration;

		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);
		progress < 1 && requestAnimationFrame(move);

		selector.style[option.prop] = `${option.value * progress}px`;
	}
}
