export interface UnboundedQueue<Item> {
	get: () => Promise<Item>;
	put: (item: Item) => void;
}

export function queue<Item>(): Queue<Item>;
