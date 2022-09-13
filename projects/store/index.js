export const writable = (initialValue, start) => {
	let value = initialValue;

	// TODO: not sure what to do about typing in here
	// /** @type {Set<import("./index").Callback<Value>>} */
	const subscribers = new Set();

	let stop;

	// TODO: not sure what to do about typing in here
	// /** @param {import("./index").Callback<Value>} callback */
	const subscribe = (callback) => {
		if (start && subscribers.size === 0) {
			stop = start(set);
		}

		subscribers.add(callback);
		callback(value);

		const unsubscribe = () => {
			subscribers.delete(callback);

			if (start && subscribers.size === 0) {
				stop();
			}
		};

		return unsubscribe;
	};

	const set = (newValue) => {
		if (newValue !== value) {
			value = newValue;

			for (const callback of Array.from(subscribers)) {
				callback(value);
			}
		}
	};

	return {
		set,
		subscribe,
		update(updater) {
			set(updater(value));
		},
	};
};

export const readable = (initialValue, start) => {
	const { subscribe } = writable(initialValue, start);
	return { subscribe };
};

const range = (n) => Array.from(Array(n).keys());
const sum = (array) => array.reduce((a, b) => a + b, 0);

export const derived = (stores, fn) => {
	const n = stores.length;
	const start = (set) => {
		const values = Array(n);
		let pending = sum(range(n).map((i) => 1 << i));

		const subscribeToStore = (store, i) =>
			store.subscribe((value) => {
				values[i] = value;
				if (pending !== 0) {
					pending &= ~(1 << i);
				}
				if (pending === 0) {
					const result = fn(values);
					set(result);
				}
			});

		const unsubscribers = stores.map(subscribeToStore);

		return () => {
			for (const unsubscribe of unsubscribers) {
				unsubscribe();
			}
		};
	};

	return readable(undefined, start);
};
