<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		/** 왜 비어 있고 무엇을 하면 되는지. 한 문장. */
		hint?: string;
		children?: Snippet;
	}

	let { title, hint, children }: Props = $props();
</script>

<div
	class="flex flex-col items-center gap-3 rounded-panel border border-hairline
            bg-elevated px-6 py-12 text-center"
>
	<p class="text-sm font-semibold text-ink">{title}</p>
	{#if hint}<p class="max-w-sm text-xs text-ink-muted">{hint}</p>{/if}
	{#if children}<div class="mt-1">{@render children()}</div>{/if}
</div>
