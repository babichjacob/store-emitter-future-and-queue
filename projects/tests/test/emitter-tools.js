import { emittable } from "@babichjacob/emitter";
import { events } from "@babichjacob/emitter-tools";

/** @type {import("@babichjacob/emitter").Emittable<number>} */
const emitter = emittable();

/** @param {number} ms */
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const producer = async () => {
	await wait(200);
	emitter.emit(17);
	await wait(1200);
	emitter.emit(18);
	await wait(400);
	emitter.emit(19);
	await wait(1400);
	emitter.emit(20);
	emitter.emit(21);
	emitter.emit(22);
};

const consumer = async () => {
	for await (const event of events(emitter)) {
		await wait(Math.random() * 4000);
		console.log("did work on", event);
	}
};

const consumers = [consumer()];

await Promise.all([producer(), ...consumers]);
