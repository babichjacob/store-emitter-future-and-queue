import { queue } from "@babichjacob/unbounded-queue";

export const values = (store) => {
	const q = queue();

	const unsubscribe = store.subscribe(q.put);

	async function* generator() {
		try {
			while (true) {
				yield await q.get();
			}
		} finally {
			unsubscribe();
		}
	}

	return generator();
};
