export function createPlugin<TConfig, TPlugin>(
	create: () => (config: TConfig) => TPlugin,
) {
	return create();
}
