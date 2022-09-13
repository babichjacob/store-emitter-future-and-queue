import Denque from "denque";

import { future } from "@babichjacob/future";

export const queue = () => {
	const items = new Denque();
	const waiting = new Denque();

	const get = () => {
		const { promise, resolve } = future();

		waiting.push(resolve);

		if (items.length !== 0) {
			waiting.shift()(items.shift());
		}

		return promise;
	};

	const put = (item) => {
		items.push(item);

		if (waiting.length !== 0) {
			waiting.shift()(items.shift());
		}
	};

	return {
		get,
		put,
	};
};
