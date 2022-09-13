import { queue } from "@babichjacob/unbounded-queue";

const stuff = queue();

/** @param {number} ms */
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const producer = async () => {
	await wait(200);
	stuff.put(17);
	await wait(1200);
	stuff.put(18);
	await wait(400);
	stuff.put(19);
	await wait(1400);
	stuff.put(20);
	stuff.put(21);
	stuff.put(22);
	await wait(250);
	stuff.put(23);
	await wait(1250);
	stuff.put(24);
	await wait(125);
	stuff.put(25);
};

/** @param {number} identifier */
const worker = async (identifier) => {
	while (true) {
		await wait(Math.random() * 1000);
		const item = await stuff.get();
		console.log(identifier, "did work on", item);
	}
};

const workers = [worker(1), worker(2), worker(3), worker(4)];

await Promise.all([producer(), ...workers]);
