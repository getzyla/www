<script lang="ts">
    import { _ } from "svelte-i18n";

    let year = new Date().getFullYear();
</script>

<footer class="w-full py-6 sm:py-8 border-t bg-background/50">
    <div class="w-full max-w-6xl mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="flex flex-col items-center md:items-start gap-2">
                <div class="flex items-center gap-3">
                    <img
                        src="https://www.upload.ee/thumb/18702411/Zyla_Logo_Black.png"
                        alt="Zyla Logo"
                        class="h-5 hover:-rotate-6 cursor-pointer transition-all duration-200"
                    />
                    <div class="flex flex-col">
                        <span class="font-semibold text-lg">Zyla</span>
                    </div>
                    <div class="flex items-center gap-1 text-sm opacity-70">
                        <span>©</span>
                        <span>{year}</span>
                    </div>
                </div>
                <div class="text-sm opacity-60">
                    Made with <i class="ri-heart-fill"></i> by <a href="https://github.com/Pimatis" class="hover:underline hover:text-primary">Pimatis</a>
                </div>
                <a href="https://github.com/getzyla/www" class="text-xs opacity-60 hover:underline hover:text-primary">{$_("footer.openSource")}</a>
            </div>

            <div class="flex items-center gap-6">
                <a href="/terms" class="text-sm opacity-70 hover:opacity-100 transition-opacity duration-200 hover:underline">
                    {$_("footer.terms")}
                </a>
                <a href="/privacy" class="text-sm opacity-70 hover:opacity-100 transition-opacity duration-200 hover:underline">
                    {$_("footer.privacyPolicy")}
                </a>
            </div>
        </div>
    </div>
</footer>
