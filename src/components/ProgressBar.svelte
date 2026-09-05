<script lang="ts">
	interface Props {
		/** 완료 개수. */
		value: number;
		/** 전체 개수. 0이면 아무것도 그리지 않는다. */
		total: number;
		/** 무엇을 처리 중인지. 예: `'슬라이드 생성'` */
		label?: string;
	}

	let { value, total, label }: Props = $props();

	const percent = $derived(total > 0 ? Math.round((value / total) * 100) : 0);
</script>

{#if total > 0}
	<div class="flex flex-col gap-1.5">
		<div class="flex items-baseline justify-between text-xs text-ink-muted">
			<span>{label ?? '처리 중'}</span>
			<span class="font-mono">{value} / {total}</span>
		</div>
		<div class="h-1 w-full overflow-hidden rounded-full bg-sunken">
			<div
				class="h-full rounded-full bg-accent transition-[width] duration-200"
				style:width="{percent}%"
			></div>
		</div>
	</div>
{/if}
