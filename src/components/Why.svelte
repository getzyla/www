<script lang="ts">
    import * as Card from "$lib/components/ui/card/index";
    import { _ } from "svelte-i18n";

    interface FeatureItem {
        title: string;
        description: string;
        icon: string;
    }

    const features: FeatureItem[] = $derived([
        {
            title: $_("why.features.free.title"),
            description: $_("why.features.free.description"),
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M11.025 21v-2.15q-1.325-.3-2.287-1.15t-1.413-2.4l1.85-.75q.375 1.2 1.113 1.825t1.937.625q1.025 0 1.738-.462t.712-1.438q0-.875-.55-1.387t-2.55-1.163q-2.15-.675-2.95-1.612t-.8-2.288q0-1.625 1.05-2.525t2.15-1.025V3h2v2.1q1.25.2 2.063.913t1.187 1.737l-1.85.8q-.3-.8-.85-1.2t-1.5-.4q-1.1 0-1.675.488T9.825 8.65q0 .825.75 1.3t2.6 1q1.725.5 2.613 1.588t.887 2.512q0 1.775-1.05 2.7t-2.6 1.15V21z"/></svg>'
        },
        {
            title: $_("why.features.unlimited.title"),
            description: $_("why.features.unlimited.description"),
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M18.6 6.62C21.58 6.62 24 9 24 12c0 2.96-2.42 5.37-5.4 5.37c-1.45 0-2.8-.56-3.82-1.57L12 13.34l-2.83 2.51c-.97.97-2.33 1.53-3.77 1.53C2.42 17.38 0 14.96 0 12s2.42-5.38 5.4-5.38c1.44 0 2.8.56 3.82 1.58L12 10.66l2.83-2.51c.97-.97 2.33-1.53 3.77-1.53M7.8 14.39L10.5 12L7.84 9.65c-.68-.68-1.53-1.03-2.44-1.03C3.53 8.62 2 10.13 2 12s1.53 3.38 3.4 3.38c.91 0 1.76-.35 2.4-.99m8.4-4.78L13.5 12l2.66 2.35c.68.68 1.54 1.03 2.44 1.03c1.87 0 3.4-1.51 3.4-3.38s-1.53-3.38-3.4-3.38c-.91 0-1.76.35-2.4.99"/></svg>'
        },
        {
            title: $_("why.features.fast.title"),
            description: $_("why.features.fast.description"),
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M10.45 15.5q.6.6 1.55.588t1.4-.688L19 7l-8.4 5.6q-.675.45-.712 1.375t.562 1.525M12 4q1.475 0 2.838.412T17.4 5.65l-1.9 1.2q-.825-.425-1.712-.637T12 6Q8.675 6 6.337 8.338T4 14q0 1.05.288 2.075T5.1 18h13.8q.575-.95.838-1.975T20 13.9q0-.9-.213-1.75t-.637-1.65l1.2-1.9q.75 1.175 1.188 2.5T22 13.85t-.325 2.725t-1.025 2.475q-.275.45-.75.7t-1 .25H5.1q-.525 0-1-.25t-.75-.7q-.65-1.125-1-2.387T2 14q0-2.075.788-3.887t2.15-3.175t3.187-2.15T12 4m.175 7.825"/></svg>'
        },
        {
            title: $_("why.features.easyToUse.title"),
            description: $_("why.features.easyToUse.description"),
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M14 22v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zM6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v3h-2V9h-5V4H6v16h6v2zm13.025-5.025l-.475-.45l.925.925z"/></svg>'
        }
    ]);

    function getBorderClasses(index: number): string {
        const isTopRow = index < 2;
        const isLeftColumn = index % 2 === 0;

        if (isLeftColumn) {
            return isTopRow ? "border-r border-b" : "border-r";
        }

        return isTopRow ? "border-b" : "";
    }
</script>

<section class="w-full min-h-96 py-12 sm:py-20 flex justify-center items-center border rounded-md bg-secondary/10">
    <div class="w-full max-w-6xl px-4">
        <div class="text-center mb-12 sm:mb-16">
            <h1 class="text-3xl sm:text-4xl font-bold mb-6">
                {$_("why.title")}
            </h1>
            <p class="text-base sm:text-lg max-w-2xl mx-auto opacity-80 leading-relaxed">
                {$_("why.description")}
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-0 border rounded-md overflow-hidden">
            {#each features as feature, index}
                <Card.Root class="h-full rounded-none border-0 {getBorderClasses(index)}">
                    <Card.Header>
                        <Card.Title class="text-xl flex items-center gap-3">
                            {@html feature.icon}
                            <span>{feature.title}</span>
                        </Card.Title>
                    </Card.Header>
                    <Card.Content>
                        <p class="opacity-80 leading-relaxed">
                            {feature.description}
                        </p>
                    </Card.Content>
                </Card.Root>
            {/each}
        </div>
    </div>
</section>