let interval: number;
self.onmessage = function (e) {
	const { action } = e.data;
	if (action === 'start') {
		interval = setInterval(() => {
			postMessage('tick');
		}, 1000);
	} else if (action === 'stop') {
		clearInterval(interval);
	} else if (action === 'reset') {
		clearInterval(interval);
		postMessage('reset');
	}
};
