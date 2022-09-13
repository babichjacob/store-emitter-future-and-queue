import { queue } from "@babichjacob/unbounded-queue";

export const events = (emitter) => {
	const q = queue();

	const unlisten = emitter.listen(q.put);

	async function* generator() {
		try {
			while (true) {
				yield await q.get();
			}
		} finally {
			unlisten();
		}
	}

	return generator();
};
