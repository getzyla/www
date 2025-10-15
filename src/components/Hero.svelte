<script lang="ts">
    import TranslateSection from "./TranslateSection.svelte";
    import { _ } from "svelte-i18n";
</script>

<section class="w-full min-h-screen flex justify-center text-center px-4">
    <div class="mt-16 sm:mt-20 w-full max-w-7xl">
        <h1 class="font-semibold text-4xl sm:text-5xl max-w-2xl mx-auto">
            {$_("hero.title")}
        </h1>
        <p class="mt-5 text-lg sm:text-xl max-w-2xl mx-auto opacity-80">
            {$_("hero.description")}
        </p>

        <TranslateSection />
    </div>
</section>
