export const future = () => {
	let resolve;
	let reject;

	const promise = new Promise((resolve_, reject_) => {
		resolve = resolve_;
		reject = reject_;
	});

	return { promise, reject, resolve };
};
