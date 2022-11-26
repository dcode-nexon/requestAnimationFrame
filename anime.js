const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
	anime(box, {
		prop: 'margin-left',
		value: 200,
		duration: 1000,
	});
});

function anime(selector, option) {
	const startTime = performance.now();
	const currentValue = parseInt(getComputedStyle(selector)[option.prop]);
	option.value !== currentValue && requestAnimationFrame(run);

	function run(time) {
		const timelast = time - startTime;
		let progress = timelast / option.duration;

		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);
		progress < 1 ? requestAnimationFrame(run) : option.callback && option.callback();

		let result = currentValue + (option.value - currentValue) * progress;
		selector.style[option.prop] = `${result}px`;
	}
}
