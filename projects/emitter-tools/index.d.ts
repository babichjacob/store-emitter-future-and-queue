import type { Listenable } from "@babichjacob/emitter";

export function events<Event>(emitter: Listenable<Event>): AsyncGenerator<Event>;
