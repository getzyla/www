<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	class={cn(
		"bg-card dark:bg-white/5 dark:border dark:border-white/10 text-card-foreground flex flex-col gap-6 rounded-md border py-6 shadow",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
