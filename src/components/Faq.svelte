<script lang="ts">
    import * as Accordion from "$lib/components/ui/accordion/index";
    import { _ } from "svelte-i18n";

    interface FaqItem {
        question: string;
        answer: string;
        icon: string;
    }

    const iconList = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M11.025 21v-2.15q-1.325-.3-2.287-1.15t-1.413-2.4l1.85-.75q.375 1.2 1.113 1.825t1.937.625q1.025 0 1.738-.462t.712-1.438q0-.875-.55-1.387t-2.55-1.163q-2.15-.675-2.95-1.612t-.8-2.288q0-1.625 1.05-2.525t2.15-1.025V3h2v2.1q1.25.2 2.063.913t1.187 1.737l-1.85.8q-.3-.8-.85-1.2t-1.5-.4q-1.1 0-1.675.488T9.825 8.65q0 .825.75 1.3t2.6 1q1.725.5 2.613 1.588t.887 2.512q0 1.775-1.05 2.7t-2.6 1.15V21z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M10.45 15.5q.6.6 1.55.588t1.4-.688L19 7l-8.4 5.6q-.675.45-.712 1.375t.562 1.525M12 4q1.475 0 2.838.412T17.4 5.65l-1.9 1.2q-.825-.425-1.712-.637T12 6Q8.675 6 6.337 8.338T4 14q0 1.05.288 2.075T5.1 18h13.8q.575-.95.838-1.975T20 13.9q0-.9-.213-1.75t-.637-1.65l1.2-1.9q.75 1.175 1.188 2.5T22 13.85t-.325 2.725t-1.025 2.475q-.275.45-.75.7t-1 .25H5.1q-.525 0-1-.25t-.75-.7q-.65-1.125-1-2.387T2 14q0-2.075.788-3.887t2.15-3.175t3.187-2.15T12 4m.175 7.825"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>'
    ];

    const faqItems: FaqItem[] = $derived(
        ($_("faq.items") as any).map((item: { question: string; answer: string }, index: number) => ({
            question: item.question,
            answer: item.answer,
            icon: iconList[index]
        }))
    );
</script>

<section class="w-full min-h-96 py-12 sm:py-20 flex justify-center items-center border rounded-md bg-secondary/10 dark:bg-white/5 dark:border dark:border-white/10">
    <div class="w-full max-w-6xl px-4">
        <div class="text-center mb-12 sm:mb-16">
            <h1 class="text-3xl sm:text-4xl font-bold mb-6">
                {$_("faq.title")}
            </h1>
            <p class="text-base sm:text-lg max-w-2xl mx-auto opacity-80 leading-relaxed">
                {$_("faq.description")}
            </p>
        </div>

        <div class="max-w-4xl mx-auto">
            <Accordion.Root type="single" class="w-full space-y-2">
                {#each faqItems as item, index}
                    <Accordion.Item value="faq-{index}">
                        <Accordion.Trigger class="px-6 py-4 hover:no-underline group">
                            <div class="flex items-center gap-3 text-left">
                                <div class="flex-shrink-0">
                                    {@html item.icon}
                                </div>
                                <span class="font-medium">{item.question}</span>
                            </div>
                        </Accordion.Trigger>
                        <Accordion.Content class="px-6 pb-2">
                            <div class="mt-2">
                                <p class="text-sm opacity-80 leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                {/each}
            </Accordion.Root>
        </div>
    </div>
</section>
