<script lang="ts">
	interface Props {
		value: string;
		label: string;
		/** 라벨을 시각적으로 숨기고 스크린리더에만 남긴다. */
		hideLabel?: boolean;
		placeholder?: string;
		/** 단위·확장자처럼 사용자가 바꿀 수 없는 꼬리표. */
		suffix?: string;
	}

	let { value = $bindable(), label, hideLabel = false, placeholder, suffix }: Props = $props();
</script>

<label class="flex flex-col gap-1.5">
	<span class={hideLabel ? 'sr-only' : 'text-xs font-medium text-ink-muted'}>{label}</span>
	<span
		class="flex items-center gap-1 rounded-control border border-hairline-strong bg-surface
		       px-3 py-2 transition focus-within:border-accent focus-within:ring-1
		       focus-within:ring-accent/10"
	>
		<input
			bind:value
			{placeholder}
			type="text"
			class="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-ink
			       placeholder:text-ink-subtle focus:ring-0"
		/>
		{#if suffix}<span class="shrink-0 text-sm text-ink-subtle">{suffix}</span>{/if}
	</span>
</label>
