import { derived, writable } from "@babichjacob/store";

const a = writable(1);
const b = writable("c");
const c = writable({ d: "value" });

const d = derived([a, b, c], ([$a, $b, $c]) => {
	return $a + $b.charCodeAt(0) + $c.d.length;
});

const unsubscribe = d.subscribe((value) => {
	console.log(value);
});

unsubscribe();
