import { writable } from "@babichjacob/store";
import { values } from "@babichjacob/store-tools";

const store = writable(15);

/** @param {number} ms */
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const producer = async () => {
	await wait(200);
	store.set(17);
	await wait(1200);
	store.set(18);
	await wait(400);
	store.set(19);
	await wait(1400);
	store.set(20);
	store.set(21);
	store.set(22);
};

const consumer = async () => {
	for await (const value of values(store)) {
		await wait(Math.random() * 4000);
		console.log("did work on", value);

		if (Math.random() > 0.8) {
			throw new Error("oh no");
		}
	}
};

const consumers = [consumer()];

await Promise.all([producer(), ...consumers]);
