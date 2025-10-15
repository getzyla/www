<script lang="ts">
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import { Button } from "$lib/components/ui/button";
    import * as Select from "$lib/components/ui/select/index.js";
    import * as Kbd from "$lib/components/ui/kbd/index.js";
    import { translateLanguages } from "$lib/utils/translate/languages";
    import { onMount, onDestroy, tick } from "svelte";
    import { _ } from "svelte-i18n";

    let inputText = $state("");
    let translatedText = $state("");
    let isTranslating = $state(false);
    let copied = $state(false);
    let sourceLanguage = $state("en");
    let targetLanguage = $state("tr");
    let os = $state("unknown");
    let keydownHandler: ((event: KeyboardEvent) => void) | null = null;
    // svelte-ignore non_reactive_update
    let resultDiv: HTMLDivElement | null = null;

    onMount(() => {
        const platform = navigator.platform.toLowerCase();
        if (platform.includes('mac')) os = 'mac';
        else if (platform.includes('win')) os = 'win';
        else os = 'linux';

        keydownHandler = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                event.preventDefault();
                handleTranslate();
            }
            if (document.activeElement === resultDiv && event.key.toLowerCase() === 'c' && translatedText) {
                event.preventDefault();
                handleCopy();
            }
        };
        window.addEventListener('keydown', keydownHandler);
    });

    onDestroy(() => {
        if (keydownHandler) {
            window.removeEventListener('keydown', keydownHandler);
        }
    });

    const shortcut = $derived(os === 'mac' ? ['⌘', '⏎'] : ['Ctrl', '⏎']);
    const sourceTriggerContent = $derived(translateLanguages.find((lang) => lang.code === sourceLanguage)?.name ?? $_("translateSection.selectSourceLanguage"));
    const targetTriggerContent = $derived(translateLanguages.find((lang) => lang.code === targetLanguage)?.name ?? $_("translateSection.selectTargetLanguage"));

    function swapLanguages() {
        const temp = sourceLanguage;
        sourceLanguage = targetLanguage;
        targetLanguage = temp;
    }

    async function handleTranslate(event?: Event) {
        if (event) event.preventDefault();
        if (!inputText.trim()) return;

        isTranslating = true;

        try {
            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: inputText,
                    sourceLanguage,
                    targetLanguage
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            translatedText = data.translated.replace(/<[^>]*>/g, '');
            await tick();
            resultDiv?.focus();
        } catch (err) {
            console.error('Translation error:', err);
            translatedText = $_("translateSection.translationFailed");
        } finally {
            isTranslating = false;
        }
    }

    function handleClear() {
        inputText = "";
        translatedText = "";
    }

    function handleCopy() {
        navigator.clipboard.writeText(translatedText);
        copied = true;
        setTimeout(() => copied = false, 2000);
    }
</script>

<div class="w-full max-w-6xl mx-auto mt-12 grid {translatedText ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6">
    <!-- svelte-ignore event_directive_deprecated -->
    <form class="relative bg-white rounded-md border shadow" on:submit={handleTranslate}>
        <div class="p-4">
            <div class="flex items-center justify-between mb-3">
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="text-sm font-medium opacity-80">
                    {$_("translateSection.textToTranslate")}
                </label>
                <span class="text-xs text-black/50">
                    {inputText.length} {$_("translateSection.characters")}
                </span>
            </div>
            <div class="flex gap-2 mb-4">
                <Select.Root type="single" bind:value={sourceLanguage}>
                    <Select.Trigger class="w-full">
                        {sourceTriggerContent}
                    </Select.Trigger>
                    <Select.Content>
                        {#each translateLanguages as lang (lang.code)}
                            <Select.Item value={lang.code} label={lang.name}>
                                {lang.name}
                            </Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>

                <Button
                    onclick={swapLanguages}
                    variant="outline"
                    size="sm"
                    class="flex-shrink-0 px-2 h-9"
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m7 17l-5-5l5-5l1.4 1.4L5.825 11h12.35L15.6 8.4L17 7l5 5l-5 5l-1.4-1.4l2.575-2.6H5.825L8.4 15.6z"/></svg>
                </Button>

                <Select.Root type="single" bind:value={targetLanguage}>
                    <Select.Trigger class="w-full">
                        {targetTriggerContent}
                    </Select.Trigger>
                    <Select.Content>
                        {#each translateLanguages as lang (lang.code)}
                            <Select.Item value={lang.code} label={lang.name}>
                                {lang.name}
                            </Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>
            </div>

            <Textarea
                bind:value={inputText}
                placeholder={$_("translateSection.placeholder")}
                class="min-h-[150px] sm:min-h-[200px] resize-none border-0 focus-visible:ring-0 text-base bg-transparent break-words"
            />

            <div class="flex items-center justify-between mt-4 pt-4 border-t">
                <div class="flex gap-2">
                    <Button
                        onclick={handleClear}
                        variant="outline"
                        size="sm"
                        disabled={!inputText}
                        class="text-xs"
                        type="button"
                    >
                        {$_("translateSection.clear")}
                    </Button>
                </div>

                <Button
                    type="submit"
                    disabled={!inputText.trim() || isTranslating}
                    class="px-6"
                >
                    {#if isTranslating}
                        <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M3.055 13H5.07a7.002 7.002 0 0 0 13.858 0h2.016a9.001 9.001 0 0 1-17.89 0m0-2a9.001 9.001 0 0 1 17.89 0h-2.016A7.002 7.002 0 0 0 5.07 11z"/></svg>
                        {$_("translateSection.translating")}
                    {:else}
                        {$_("translateSection.translate")}
                        <Kbd.Group class="ml-2">
                            <Kbd.Root>{shortcut[0]}</Kbd.Root>
                            <Kbd.Root>{shortcut[1]}</Kbd.Root>
                        </Kbd.Group>
                    {/if}
                </Button>
            </div>
        </div>
    </form>

    {#if translatedText}
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <div class="relative bg-white rounded-md border shadow" bind:this={resultDiv} tabindex="0">
            <div class="p-4">
                <div class="flex items-center justify-between mb-3">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="text-sm font-medium flex items-center gap-2">
                        {$_("translateSection.translationResult")}
                    </label>

                    <Button
                        variant="outline"
                        onclick={handleCopy}
                    >
                        {#if copied}
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"/></svg>
                            {$_("translateSection.copied")}
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7 18V2h13v16zm-4 4V6h2v14h11v2z"/></svg>
                            {$_("translateSection.copy")}
                            <Kbd.Root class="ml-1">C</Kbd.Root>
                        {/if}
                    </Button>
                </div>
                <div class="overflow-hidden">
                    <p class="text-base text-black/80 whitespace-pre-wrap leading-relaxed text-left break-words">
                        {translatedText}
                    </p>
                </div>
            </div>
        </div>
    {/if}
</div>
