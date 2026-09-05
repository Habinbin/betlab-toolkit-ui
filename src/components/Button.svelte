<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
	type Size = 'sm' | 'md';

	interface Props extends HTMLButtonAttributes {
		variant?: Variant;
		size?: Size;
		/** 가로를 꽉 채운다. 패널 하단의 주 행동 버튼에 쓴다. */
		block?: boolean;
		children: Snippet;
	}

	let {
		variant = 'secondary',
		size = 'md',
		block = false,
		class: extra = '',
		children,
		...rest
	}: Props = $props();

	const VARIANTS: Record<Variant, string> = {
		primary: 'bg-accent text-on-accent hover:bg-accent-hover',
		secondary: 'border border-hairline-strong text-ink hover:border-accent',
		ghost: 'text-ink-muted hover:bg-sunken hover:text-ink',
		danger: 'text-ink-subtle hover:bg-danger/10 hover:text-danger'
	};

	const SIZES: Record<Size, string> = {
		sm: 'px-2.5 py-1.5 text-xs gap-1.5',
		md: 'px-4 py-2.5 text-sm gap-2'
	};
</script>

<button
	class="inline-flex items-center justify-center rounded-control font-semibold transition-colors
	       duration-200 disabled:cursor-not-allowed disabled:opacity-50
	       {VARIANTS[variant]} {SIZES[size]} {block ? 'w-full' : ''} {extra}"
	{...rest}
>
	{@render children()}
</button>
