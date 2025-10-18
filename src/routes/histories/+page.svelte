<script lang="ts">
    import { onMount, tick } from "svelte";
    import { getAllTranslations } from "$lib/utils/storage/get";
    import { deleteTranslation } from "$lib/utils/storage/delete";
    import { deleteAllTranslations } from "$lib/utils/storage/deleteAll";
    import type { Translation } from "$lib/utils/storage/set";
    import { _ } from "svelte-i18n";
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import * as Dialog from "$lib/components/ui/dialog/index";
    import Navbar from "../../components/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";

    let translations = $state<Translation[]>([]);
    let isLoading = $state(true);
    let error = $state<string | null>(null);
    let copied = $state(false);
    let deleteAllDialogOpen = $state(false);

    onMount(async () => {
        try {
            translations = await getAllTranslations();
        } catch (err) {
            console.error("Failed to load translations:", err);
            error = $_("histories.loadError");
        } finally {
            isLoading = false;
        }
    });

    function formatDate(timestamp: number): string {
        return new Date(timestamp).toLocaleString();
    }

    async function handleDelete(id: number) {
        try {
            await deleteTranslation(id);
            translations = await getAllTranslations();
            await tick();
        } catch (err) {
            console.error("Failed to delete translation:", err);
        }
    }

    function handleCopy(text: string) {
        navigator.clipboard.writeText(text);
        copied = true;
        setTimeout(() => (copied = false), 2000);
    }

    async function handleDeleteAll() {
        try {
            await deleteAllTranslations();
            translations = [];
            await tick();
            deleteAllDialogOpen = false;
        } catch (err) {
            console.error("Failed to delete all translations:", err);
        }
    }
</script>

<div class="px-5 sm:px-10 md:px-20">
    <Navbar />

    <div class="py-8">
        <div class="container mx-auto">
            <h1 class="text-xl md:text-2xl lg:text-3xl font-bold text-left mb-4">{$_("histories.title")}</h1>
            <p class="text-xs md:text-sm lg:text-base text-left opacity-80 mb-4">{$_("histories.description")}</p>

            {#if translations.length > 0}
                <Button variant="outline" onclick={() => deleteAllDialogOpen = true} class="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/>
                    </svg>
                    {$_("histories.deleteAll")}
                </Button>
            {/if}

            {#if isLoading}
                <div class="flex justify-center items-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="animate-spin">
                        <g fill="currentColor"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity=".2"/><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z"/></g>
                    </svg>
                </div>
            {:else if error}
                <div class="text-center text-red-500 opacity-80 py-12">
                    {error}
                </div>
            {:else if translations.length === 0}
                <div class="text-center opacity-80 py-12">
                    {$_("histories.noTranslations")}
                </div>
            {:else}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each translations as translation (translation.id)}
                        <Card.Root>
                            <Card.Header>
                                <Card.Title class="text-base md:text-lg">
                                    {translation.sourceLanguage.toUpperCase()} → {translation.targetLanguage.toUpperCase()}
                                </Card.Title>
                                <Card.Description class="text-xs md:text-sm opacity-80">
                                    {formatDate(translation.timestamp)}
                                </Card.Description>
                            </Card.Header>
                            <Card.Content class="space-y-4">
                                <div>
                                    <h4 class="text-xs md:text-sm font-medium mb-2">{$_("histories.originalText")}</h4>
                                    <p class="text-xs md:text-sm bg-secondary dark:bg-white/5 dark:border dark:border-white/10 border p-2 md:p-3 rounded-md break-words">
                                        {translation.inputText}
                                    </p>
                                </div>
                                <div>
                                    <h4 class="text-xs md:text-sm font-medium mb-2">{$_("histories.translatedText")}</h4>
                                    <p class="text-xs md:text-sm bg-secondary dark:bg-white/5 dark:border dark:border-white/10 border p-2 md:p-3 rounded-md break-words">
                                        {translation.translatedText}
                                    </p>
                                </div>
                            </Card.Content>
                            <Card.Footer class="flex flex-col gap-2 md:flex-row">
                                <Button variant="outline" onclick={() => handleCopy(translation.translatedText)} class="w-full md:flex-1">
                                    {#if copied}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" />
                                        </svg>
                                        {$_("translateSection.copied")}
                                    {:else}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M7 18V2h13v16zm-4 4V6h2v14h11v2z" />
                                        </svg>
                                        {$_("translateSection.copy")}
                                    {/if}
                                </Button>
                                <Button variant="destructive" onclick={() => handleDelete(translation.id!)} class="w-full md:flex-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/>
                                    </svg>
                                    {$_("histories.delete")}
                                </Button>
                            </Card.Footer>
                        </Card.Root>
                    {/each}
                </div>
            {/if}
        </div>
    </div>

    <Dialog.Root bind:open={deleteAllDialogOpen}>
        <Dialog.Content class="sm:max-w-md">
            <Dialog.Header>
                <Dialog.Title>{$_("histories.deleteAllTitle")}</Dialog.Title>
                <Dialog.Description>
                    {$_("histories.deleteAllDescription")}
                </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
                <Button variant="outline" onclick={() => deleteAllDialogOpen = false}>
                    {$_("histories.cancel")}
                </Button>
                <Button variant="destructive" onclick={handleDeleteAll}>
                    {$_("histories.confirm")}
                </Button>
            </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Root>

    <Footer />
</div>
