type Emit<Event> = (event: Event) => void;

type Handler<Event> = (event: Event) => void;

type Listen<Event> = (handler: Handler<Event>) => Unlisten;
type Unlisten = () => void;

export interface Listenable<Event> {
	listen: Listen<Event>;
}

export interface Emittable<Event> extends Listenable<Event> {
	emit: Emit<Event>;
}

type Start<Event> = (emit: Emit<Event>) => Stop;
type Stop = () => void;

export function emittable<Event>(start?: Start<Event>): Emittable<Event>;

export function listenable<Event>(start?: Start<Event>): Listenable<Value>;

export function next<Event>(emitter: Listenable<Event>): Promise<Event>;

export function mapped<Value, Result>(emitter: Listenable<Event>, fn: (event: Event) => Result): Listenable<Result>;
