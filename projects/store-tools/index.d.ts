import type { Readable } from "@babichjacob/store";

export function values<Value>(store: Readable<Value>): AsyncGenerator<Value>;
