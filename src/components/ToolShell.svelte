<script lang="ts">
	import type { Snippet } from 'svelte';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';

	interface Props {
		title: string;
		description?: string;
		/** 런처로 돌아가는 경로. 껍데기가 정한다. */
		backHref?: string;
		/** 헤더 우측 — 주 행동이 아닌 보조 컨트롤만. */
		actions?: Snippet;
		children: Snippet;
	}

	let { title, description, backHref = '/', actions, children }: Props = $props();
</script>

<div class="min-h-screen bg-surface text-ink">
	<header class="border-b border-hairline">
		<div class="mx-auto flex max-w-6xl items-center gap-4 px-6 py-5">
			<a
				href={backHref}
				aria-label="목록으로"
				class="grid size-9 shrink-0 place-items-center rounded-control text-ink-muted
				       transition hover:bg-sunken hover:text-ink"
			>
				<ArrowLeftIcon class="size-4" />
			</a>
			<div class="min-w-0 flex-1">
				<h1 class="truncate text-lg font-semibold">{title}</h1>
				{#if description}
					<p class="truncate text-xs text-ink-muted">{description}</p>
				{/if}
			</div>
			{#if actions}<div class="flex shrink-0 items-center gap-2">{@render actions()}</div>{/if}
		</div>
	</header>

	<main class="mx-auto max-w-6xl px-6 py-8">
		{@render children()}
	</main>
</div>
