export interface Future<Resolution, Rejection> {
	promise: Promise<Resolution>;
	resolve: (value: Resolution) => void;
	reject: (reason: Rejection) => void;
}

export function future<Resolution, Rejection>(): Future<Resolution, Rejection>;
