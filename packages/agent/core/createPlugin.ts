export function createPlugin<T>(
	handler: (props: {
		log: (message: string) => void;
		generateReply: (prompt: string) => Promise<string>;
	}) => Promise<T>,
) {
	return { register: handler };
}
