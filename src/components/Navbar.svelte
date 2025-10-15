<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Dialog from "$lib/components/ui/dialog/index";
    import * as Select from "$lib/components/ui/select/index";
    import { language, setLanguage } from "$lib/stores/language";
    import { languages } from "$lib/utils/languages";
    import { _ } from "svelte-i18n";
    import * as Tooltip from "$lib/components/ui/tooltip/index";

    let settingsDialogOpen = $state(false);
    const currentLanguage = $derived($language);
    const languageTriggerContent = $derived(
        languages.find((lang) => lang.code === currentLanguage)?.name ?? "Select language"
    );

    function handleLanguageChange(selectedCode: string | undefined) {
        if (!selectedCode) return;

        const validLanguageCodes = languages.map((lang) => lang.code);
        if (!validLanguageCodes.includes(selectedCode)) return;

        setLanguage(selectedCode as typeof languages[number]["code"]);
    }
</script>

<nav class="w-full h-14 flex items-center justify-between px-4">
    <a href="/">
        <img src="https://www.upload.ee/thumb/18702411/Zyla_Logo_Black.png" alt="Zyla Logo" class="h-7 hover:-rotate-6 cursor-pointer transition-all duration-200" />
    </a>

    <div class="flex items-center gap-2">
        <Dialog.Root bind:open={settingsDialogOpen}>
            <Dialog.Trigger>
                <Button variant="outline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"/></svg>
                </Button>
            </Dialog.Trigger>
            <Dialog.Content class="sm:max-w-md">
                <Dialog.Header>
                    <Dialog.Title>{$_("navbar.settingsDialog.title")}</Dialog.Title>
                    <Dialog.Description>
                        {$_("navbar.settingsDialog.description")}
                    </Dialog.Description>
                </Dialog.Header>
                <div class="py-4">
                    <div class="space-y-4">
                        <div>
                            <h3 class="text-sm font-medium mb-3">{$_("navbar.settingsDialog.languageLabel")}</h3>
                            <Select.Root type="single" value={currentLanguage} onValueChange={handleLanguageChange}>
                                <Select.Trigger class="w-full">
                                    {languageTriggerContent}
                                </Select.Trigger>
                                <Select.Content>
                                    {#each languages as lang (lang.code)}
                                        <Select.Item value={lang.code} label={lang.name}>
                                            {lang.name}
                                        </Select.Item>
                                    {/each}
                                </Select.Content>
                            </Select.Root>
                        </div>
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Root>

        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Button variant="outline" disabled>{$_("navbar.extensionButton")}</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                    <p>{$_("tooltips.soon")}</p>
                </Tooltip.Content>
            </Tooltip.Root>
        </Tooltip.Provider>
    </div>
</nav>
