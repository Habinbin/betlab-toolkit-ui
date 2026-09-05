<script lang="ts" generics="T extends { id: string }">
	import type { Snippet } from 'svelte';
	import GripVerticalIcon from '@lucide/svelte/icons/grip-vertical';
	import XIcon from '@lucide/svelte/icons/x';

	interface Props {
		items: T[];
		/** 재정렬 결과. 새 배열을 넘긴다 — 입력 배열은 변형하지 않는다. */
		onreorder: (next: T[]) => void;
		/** 개별 제거. 없으면 제거 버튼을 그리지 않는다. */
		onremove?: (item: T) => void;
		/** 카드 본문. 순번(1부터)을 함께 준다. */
		item: Snippet<[T, number]>;
	}

	let { items, onreorder, onremove, item }: Props = $props();

	let draggingIndex = $state<number | null>(null);
	let overIndex = $state<number | null>(null);

	/**
	 * 끌어온 항목을 목표 위치로 옮긴 새 배열을 만든다.
	 *
	 * @param from 원래 인덱스.
	 * @param to 놓을 인덱스.
	 * @returns 재정렬된 새 배열. from === to 면 원본과 같은 내용.
	 */
	function move(from: number, to: number): T[] {
		const next = [...items];
		const [moved] = next.splice(from, 1);
		next.splice(to, 0, moved);
		return next;
	}

	function drop(to: number): void {
		if (draggingIndex !== null && draggingIndex !== to) {
			onreorder(move(draggingIndex, to));
		}
		draggingIndex = null;
		overIndex = null;
	}
</script>

<ul class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
	{#each items as entry, index (entry.id)}
		<li
			draggable="true"
			ondragstart={() => (draggingIndex = index)}
			ondragend={() => {
				draggingIndex = null;
				overIndex = null;
			}}
			ondragover={(e) => {
				e.preventDefault();
				overIndex = index;
			}}
			ondrop={(e) => {
				e.preventDefault();
				drop(index);
			}}
			class="group relative flex flex-col overflow-hidden rounded-panel border bg-surface
			       transition-all duration-200
			       {overIndex === index && draggingIndex !== index
				? 'border-accent'
				: 'border-hairline'}
			       {draggingIndex === index ? 'opacity-40' : ''}"
		>
			<div class="flex items-center justify-between border-b border-hairline px-2.5 py-1.5">
				<span class="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
					<GripVerticalIcon class="size-3.5 cursor-grab text-ink-subtle" />
					{index + 1}
				</span>
				{#if onremove}
					<button
						type="button"
						aria-label="제거"
						onclick={() => onremove(entry)}
						class="rounded p-1 text-ink-subtle opacity-0 transition group-hover:opacity-100
						       hover:bg-danger/10 hover:text-danger focus-visible:opacity-100"
					>
						<XIcon class="size-3.5" />
					</button>
				{/if}
			</div>
			{@render item(entry, index + 1)}
		</li>
	{/each}
</ul>
