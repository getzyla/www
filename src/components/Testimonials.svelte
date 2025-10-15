<script lang="ts">
    import * as Card from "$lib/components/ui/card/index";
    import { _ } from "svelte-i18n";

    interface Testimonial {
        name: string;
        avatar: string;
        rating: number;
        comment: string;
    }

    const testimonials: Testimonial[] = $derived($_("testimonials.items"));

    function getStarIcon(filled: boolean): string {
        if (filled) {
            return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275z"/></svg>';
        }
        return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zm-3.025 4.175l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275zM12 13.25"/></svg>';
    }

    function getGridClasses(index: number): string {
        const position = index % 3;

        if (position === 0) {
            return "md:col-start-1";
        }

        if (position === 1) {
            return "md:col-start-2 md:mt-8";
        }

        return "md:col-start-3 md:mt-16";
    }
</script>

<section class="w-full min-h-96 py-12 sm:py-20 flex justify-center items-center">
    <div class="w-full max-w-6xl px-4">
        <div class="text-center mb-12 sm:mb-16">
            <h1 class="text-3xl sm:text-4xl font-bold mb-6">
                {$_("testimonials.title")}
            </h1>
            <p class="text-base sm:text-lg max-w-2xl mx-auto opacity-80 leading-relaxed">
                {$_("testimonials.description")}
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {#each testimonials as testimonial, index}
                <div class={getGridClasses(index)}>
                    <Card.Root class="h-full border shadow">
                        <Card.Header>
                            <div class="flex items-start gap-4 mb-4">
                                <div class="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span class="text-sm font-semibold text-primary">
                                        {testimonial.avatar}
                                    </span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3 class="font-semibold text-base">
                                        {testimonial.name}
                                    </h3>
                                    <div class="flex items-center gap-1 mt-1">
                                        {#each Array(5) as _, starIndex}
                                            <span class="text-yellow-500">
                                                {@html getStarIcon(starIndex < testimonial.rating)}
                                            </span>
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </Card.Header>

                        <Card.Content>
                            <div class="relative">
                                <svg class="absolute -top-2 -left-2 opacity-20" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                                </svg>
                                <p class="text-sm opacity-80 leading-relaxed pl-4">
                                    {testimonial.comment}
                                </p>
                            </div>
                        </Card.Content>
                    </Card.Root>
                </div>
            {/each}
        </div>

        <div class="mt-12 sm:mt-16 text-center">
            <div class="inline-flex items-center gap-4 sm:gap-8 px-6 sm:px-8 py-4 sm:py-6 rounded-md border bg-secondary/5">
                <div class="text-center">
                    <div class="text-2xl sm:text-3xl font-bold">100+</div>
                    <div class="text-sm opacity-70 mt-1">{$_("testimonials.stats.activeUsers")}</div>
                </div>
                <div class="w-px h-8 sm:h-12 bg-border"></div>
                <div class="text-center">
                    <div class="text-2xl sm:text-3xl font-bold">210k+</div>
                    <div class="text-sm opacity-70 mt-1">{$_("testimonials.stats.translations")}</div>
                </div>
                <div class="w-px h-8 sm:h-12 bg-border"></div>
                <div class="text-center">
                    <div class="text-2xl sm:text-3xl font-bold">4.9/5</div>
                    <div class="text-sm opacity-70 mt-1">{$_("testimonials.stats.rating")}</div>
                </div>
            </div>
        </div>
    </div>
</section>
