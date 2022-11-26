const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
	anime(box, {
		prop: 'top',
		value: '50%',
		duration: 1000,
	});
});

function anime(selector, option) {
	const startTime = performance.now();
	let currentValue = parseInt(getComputedStyle(selector)[option.prop]);

	const isString = typeof option.value;
	if (isString === 'string') {
		const parentW = parseInt(getComputedStyle(selector.parentElement).width);
		const parentH = parseInt(getComputedStyle(selector.parentElement).height);
		const x = ['margin-left', 'margin-right', 'left', 'right', 'width'];
		const y = ['margin-top', 'margin-bottom', 'top', 'bottom', 'height'];
		for (const cond of x) option.prop === cond && (currentValue = (currentValue / parentW) * 100);
		for (const cond of y) option.prop === cond && (currentValue = (currentValue / parentH) * 100);
		option.value = parseFloat(option.value);
	}
	option.value !== currentValue && requestAnimationFrame(run);

	function run(time) {
		const timelast = time - startTime;
		let progress = timelast / option.duration;

		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);
		progress < 1 ? requestAnimationFrame(run) : option.callback && option.callback();

		let result = currentValue + (option.value - currentValue) * progress;

		//isString값이 문자열이면 뒤에 %적용, 그렇지않으면 px적용
		if (isString === 'string') selector.style[option.prop] = `${result}%`;
		else selector.style[option.prop] = `${result}px`;
	}
}
