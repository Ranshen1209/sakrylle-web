// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { i18n as i18nType } from 'i18next';
import type { Readable } from 'svelte/store';

declare global {
	interface Window {
		tether?: {
			version: 1;
			isFocused?(): Promise<boolean>;
			focus?(): Promise<void>;
			onEvent?(
				callback: (
					event:
						| import('$lib/stores').TetherEvent
						| { type: 'theme:update'; data: { theme: 'system' | 'light' | 'dark' } }
				) => Promise<void>
			): () => void;
			signedIn(token: string): Promise<{ token: string; expiresAt: number | null }>;
			refresh(force?: boolean): Promise<{ token: string; expiresAt: number | null } | null>;
			signedOut(): Promise<void>;
			onToken(
				callback: (access: { token: string; expiresAt: number | null } | null) => void
			): () => void;
		};
	}

	class AudioWorkletProcessor {
		readonly port: MessagePort;
	}
	function registerProcessor(name: string, processor: typeof AudioWorkletProcessor): void;

	const APP_VERSION: string;
	const APP_BUILD_HASH: string;
	const APP_BUILD_CHANNEL: 'main' | 'dev' | 'unknown';

	namespace App {
		interface PageState {
			inbox?: boolean;
			inboxUserId?: string;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

declare module 'svelte' {
	export function getContext(key: 'i18n'): Readable<i18nType>;
}

export {};
