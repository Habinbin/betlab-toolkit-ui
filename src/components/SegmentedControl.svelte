<script lang="ts" generics="V extends string">
	interface Option {
		value: V;
		label: string;
	}

	interface Props {
		value: V;
		options: Option[];
		label: string;
		/**
		 * 값이 자동 감지된 것임을 표시한다. 사용자가 손대지 않아도 되는 상태라는 신호.
		 * @tool-ux-principles §1 — 추론한 값은 묻지 않되, 보이기는 한다.
		 */
		detected?: boolean;
	}

	let { value = $bindable(), options, label, detected = false }: Props = $props();
</script>

<div class="flex flex-col gap-1.5">
	<span class="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
		{label}
		{#if detected}
			<span class="rounded-full bg-sunken px-1.5 py-0.5 text-[10px] text-ink-subtle">자동 감지</span>
		{/if}
	</span>
	<div class="inline-flex rounded-control border border-hairline p-0.5">
		{#each options as option (option.value)}
			<button
				type="button"
				onclick={() => (value = option.value)}
				class="rounded px-2.5 py-1 text-xs font-medium transition-colors
				       {value === option.value
					? 'bg-accent text-on-accent'
					: 'text-ink-muted hover:text-ink'}"
			>
				{option.label}
			</button>
		{/each}
	</div>
</div>
