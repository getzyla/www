<script lang="ts">
    import * as Accordion from "$lib/components/ui/accordion/index";
    import Navbar from "../../components/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";
    import { _ } from "svelte-i18n";

    interface PrivacySection {
        title: string;
        content: string;
        icon: string;
        subsections?: { subtitle: string; text: string }[];
    }

    const iconList = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>'
    ];

    const privacySections: PrivacySection[] = $derived(
        ($_("privacy.sections") as any).map((section: any, index: number) => ({
            title: section.title,
            content: section.content,
            icon: iconList[index],
            subsections: section.subsections
        }))
    );
</script>

<svelte:head>
    <meta name="description" content="Zyla'nın gizlilik politikası: Neredeyse hiç veri toplamıyoruz. Minimum veri uygulamalarımız ve açık kaynak şeffaflığı hakkında bilgi edinin." />
</svelte:head>

<div class="px-5 sm:px-10 md:px-20">
    <Navbar />

    <div class="w-full min-h-screen bg-background dark:bg-white/5 dark:border dark:border-white/10 mt-10 dark:rounded-md">
        <section class="w-full py-12 sm:py-20 flex justify-center items-center">
            <div class="w-full max-w-5xl px-4">
                <div class="text-center mb-12 sm:mb-16">
                    <h1 class="text-3xl sm:text-4xl font-bold mb-6">
                        {$_("privacy.title")}
                    </h1>
                    <p class="text-base sm:text-lg max-w-2xl mx-auto opacity-80 leading-relaxed">
                        {$_("privacy.description")}
                    </p>
                </div>

                <div class="mb-12 border rounded-md bg-secondary/10 dark:bg-white/5 dark:border dark:border-white/10 p-6">
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-semibold text-lg mb-2">{$_("privacy.importantNotice.title")}</h3>
                            <p class="text-sm opacity-80 leading-relaxed">
                                {$_("privacy.importantNotice.content")}
                            </p>
                        </div>
                    </div>
                </div>

                <Accordion.Root type="single" class="w-full space-y-3">
                    {#each privacySections as section, index}
                        <Accordion.Item value="privacy-{index}">
                            <Accordion.Trigger class="px-6 py-5 hover:no-underline group">
                                <div class="flex items-center gap-3 text-left">
                                    <div class="flex-shrink-0">
                                        {@html section.icon}
                                    </div>
                                    <span class="font-semibold text-base">{section.title}</span>
                                </div>
                            </Accordion.Trigger>
                            <Accordion.Content class="px-6 pb-6">
                                <div class="mt-2 space-y-4">
                                    <p class="text-sm opacity-80 leading-relaxed">
                                        {section.content}
                                    </p>

                                    {#if section.subsections && section.subsections.length > 0}
                                        <div class="mt-6 space-y-4">
                                            {#each section.subsections as subsection}
                                                <div class="pl-4 border-l-2 border-primary/20 dark:border-white/20">
                                                    <h4 class="font-semibold text-sm mb-2 text-primary dark:text-white">
                                                        {subsection.subtitle}
                                                    </h4>
                                                    <p class="text-sm opacity-75 leading-relaxed">
                                                        {subsection.text}
                                                    </p>
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>
                            </Accordion.Content>
                        </Accordion.Item>
                    {/each}
                </Accordion.Root>

                <div class="mt-12 border rounded-md bg-gradient-to-br from-primary/5 to-secondary/5 dark:bg-white/5 dark:border dark:border-white/10 p-8">
                    <div class="text-center">
                        <h3 class="text-xl font-semibold mb-4">{$_("privacy.questions.title")}</h3>
                        <p class="text-sm opacity-80 leading-relaxed max-w-2xl mx-auto mb-6">
                            {$_("privacy.questions.content")}
                        </p>
                        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="mailto:privacy@getzyla.xyz" class="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                                {$_("privacy.questions.contactUs")}
                            </a>
                            <a href="https://github.com/getzyla/www" class="inline-flex items-center gap-2 px-6 py-3 rounded-md border bg-background hover:bg-secondary/50 dark:bg-white/5 dark:border dark:border-white/10 transition-colors font-medium text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                {$_("privacy.questions.viewSourceCode")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <Footer />
</div>
