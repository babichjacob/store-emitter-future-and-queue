export const emittable = (start) => {
	const listeners = new Set();

	let stop;

	const listen = (handler) => {
		if (start && listeners.size === 0) {
			stop = start(emit);
		}

		listeners.add(handler);

		const unlisten = () => {
			listeners.delete(handler);

			if (start && listeners.size === 0) {
				stop();
			}
		};

		return unlisten;
	};

	const emit = (event) => {
		for (const handler of Array.from(listeners)) {
			handler(event);
		}
	};

	return { emit, listen };
};

export const listenable = (start) => {
	const { listen } = emittable(start);
	return { listen };
};

export const next = (emitter) =>
	new Promise((resolve) => {
		const unlisten = emitter.listen((event) => {
			unlisten();
			resolve(event);
		});
	});

export const mapped = (emitter, fn) => {
	return listenable((emit) => emitter.listen((event) => emit(fn(event))));
};
