<script lang="ts">
    import * as Accordion from "$lib/components/ui/accordion/index";
    import Navbar from "../../components/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";
    import { _ } from "svelte-i18n";

    interface TermSection {
        title: string;
        content: string;
        icon: string;
        subsections?: { subtitle: string; text: string }[];
    }

    const iconList = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M18.6 6.62C21.58 6.62 24 9 24 12c0 2.96-2.42 5.37-5.4 5.37c-1.45 0-2.8-.56-3.82-1.57L12 13.34l-2.83 2.51c-.97.97-2.33 1.53-3.77 1.53C2.42 17.38 0 14.96 0 12s2.42-5.38 5.4-5.38c1.44 0 2.8.56 3.82 1.58L12 10.66l2.83-2.51c.97-.97 2.33-1.53 3.77-1.53M7.8 14.39L10.5 12L7.84 9.65c-.68-.68-1.53-1.03-2.44-1.03C3.53 8.62 2 10.13 2 12s1.53 3.38 3.4 3.38c.91 0 1.76-.35 2.4-.99m8.4-4.78L13.5 12l2.66 2.35c.68.68 1.54 1.03 2.44 1.03c1.87 0 3.4-1.51 3.4-3.38s-1.53-3.38-3.4-3.38c-.91 0-1.76.35-2.4.99"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>'
    ];

    const termsSections: TermSection[] = $derived(
        ($_("terms.sections") as any).map((section: any, index: number) => ({
            title: section.title,
            content: section.content,
            icon: iconList[index],
            subsections: section.subsections
        }))
    );
</script>

<svelte:head>
    <meta name="description" content="Zyla'nın Kullanım Şartlarını okuyarak yapay zeka destekli çeviri hizmetimizi kullanırken haklarınızı ve sorumluluklarınızı anlayın." />
</svelte:head>

<div class="px-5 sm:px-10 md:px-20">
    <Navbar />

    <div class="w-full min-h-screen bg-background">
        <section class="w-full py-12 sm:py-20 flex justify-center items-center">
            <div class="w-full max-w-5xl px-4">
                <div class="text-center mb-12 sm:mb-16">
                    <h1 class="text-3xl sm:text-4xl font-bold mb-6">
                        {$_("terms.title")}
                    </h1>
                    <p class="text-base sm:text-lg max-w-2xl mx-auto opacity-80 leading-relaxed">
                        {$_("terms.description")}
                    </p>
                </div>

                <div class="mb-12 border rounded-md bg-secondary/10 p-6">
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-primary" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M11 17h2v-6h-2v6zm1-8q.425 0 .713-.288T13 8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8q0 .425.288.713T12 9zm0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-semibold text-lg mb-2">{$_("terms.importantNotice.title")}</h3>
                            <p class="text-sm opacity-80 leading-relaxed">
                                {$_("terms.importantNotice.content")}
                            </p>
                        </div>
                    </div>
                </div>

                <Accordion.Root type="single" class="w-full space-y-3">
                    {#each termsSections as section, index}
                        <Accordion.Item value="term-{index}">
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
                                                <div class="pl-4 border-l-2 border-primary/20">
                                                    <h4 class="font-semibold text-sm mb-2 text-primary">
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

                <div class="mt-12 border rounded-md bg-gradient-to-br from-primary/5 to-secondary/5 p-8">
                    <div class="text-center">
                        <h3 class="text-xl font-semibold mb-4">{$_("terms.questions.title")}</h3>
                        <p class="text-sm opacity-80 leading-relaxed max-w-2xl mx-auto mb-6">
                            {$_("terms.questions.content")}
                        </p>
                        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="mailto:support@getzyla.xyz" class="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                                {$_("terms.questions.contactSupport")}
                            </a>
                            <a href="/privacy" class="inline-flex items-center gap-2 px-6 py-3 rounded-md border bg-background hover:bg-secondary/50 transition-colors font-medium text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                                </svg>
                                {$_("terms.questions.privacyPolicy")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <Footer />
</div>
