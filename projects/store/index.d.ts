type Set<Value> = (value: Value) => void;

type Callback<Value> = (value: Value) => void;

type Subscribe<Value> = (callback: Callback<Value>) => Unsubscribe;
type Unsubscribe = () => void;

export interface Readable<Value> {
	subscribe: Subscribe<Value>;
}

export interface Writable<Value> extends Readable<Value> {
	set: Set<Value>;
}

export interface Updatable<Value> extends Writable<Value> {
	update: (updater: (value: Value) => Value) => void;
}

type Start<Value> = (set: Set<Value>) => Stop;
type Stop = () => void;

export function writable<Value>(initialValue: Value, start?: Start<Value>): Updatable<Value>;
export function readable<Value>(initialValue: Value, start?: Start<Value>): Readable<Value>;

type StoresValues<Stores> = { [Store in keyof Stores]: Stores[Store] extends Readable<infer Value> ? Value : never };
export function derived<Stores extends [Readable<any>, ...Readable<any>], Result>(stores: Stores, fn: (values: StoresValues<Stores>) => Result): Readable<Result>;
