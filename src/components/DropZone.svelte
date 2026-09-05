<script lang="ts">
	import type { Snippet } from 'svelte';
	import UploadCloudIcon from '@lucide/svelte/icons/upload-cloud';

	interface Props {
		/** `input[type=file]` 의 accept. 예: `'image/png,image/jpeg'` */
		accept?: string;
		multiple?: boolean;
		/** 이미 파일이 있을 때의 좁은 형태. 목록 위/아래에 둔다. */
		compact?: boolean;
		/** 큰 형태의 안내 문구. 무엇을 넣으라는 것인지 한 줄로. */
		label?: string;
		/** 큰 형태의 보조 문구. 형식·순서 같은 제약을 여기 적는다. */
		hint?: string;
		onfiles: (files: File[]) => void;
		children?: Snippet;
	}

	let {
		accept,
		multiple = true,
		compact = false,
		label = '파일을 여기에 놓으세요',
		hint,
		onfiles,
		children
	}: Props = $props();

	let dragging = $state(false);
	let input: HTMLInputElement;

	/**
	 * 드롭·선택된 파일을 accept 에 맞게 거른 뒤 상위로 넘긴다.
	 *
	 * @param list 브라우저가 준 FileList. null 이면 아무것도 하지 않는다.
	 */
	function emit(list: FileList | null): void {
		if (list === null || list.length === 0) return;
		onfiles(Array.from(list));
	}

	function onDrop(event: DragEvent): void {
		event.preventDefault();
		dragging = false;
		emit(event.dataTransfer?.files ?? null);
	}
</script>

<svelte:element
	this="div"
	role="presentation"
	ondragover={(e: DragEvent) => {
		e.preventDefault();
		dragging = true;
	}}
	ondragleave={() => (dragging = false)}
	ondrop={onDrop}
	class={compact ? 'w-full' : 'flex w-full justify-center'}
>
	<input
		bind:this={input}
		type="file"
		{accept}
		{multiple}
		class="hidden"
		onchange={(e) => {
			emit(e.currentTarget.files);
			e.currentTarget.value = '';
		}}
	/>

	{#if compact}
		<button
			type="button"
			onclick={() => input.click()}
			class="flex w-full items-center justify-center gap-2 rounded-control border border-dashed
			       px-3 py-2 text-sm font-medium transition
			       {dragging
				? 'border-accent text-ink'
				: 'border-hairline-strong text-ink-muted hover:border-accent hover:text-ink'}"
		>
			<UploadCloudIcon class="size-4" />
			{label}
		</button>
	{:else}
		<button
			type="button"
			onclick={() => input.click()}
			class="flex w-full max-w-lg flex-col items-center gap-5 rounded-panel border-2 border-dashed
			       bg-surface px-10 py-16 text-center transition-all duration-300
			       {dragging ? 'border-accent bg-elevated' : 'border-hairline hover:border-accent'}"
		>
			<UploadCloudIcon class="size-10 text-ink-subtle" />
			<div class="flex flex-col gap-1.5">
				<span class="text-sm font-semibold text-ink">{label}</span>
				{#if hint}<span class="text-xs text-ink-muted">{hint}</span>{/if}
			</div>
			{#if children}{@render children()}{/if}
		</button>
	{/if}
</svelte:element>
