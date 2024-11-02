import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import relativeLinks from "astro-relative-links";
// https://astro.build/config
export default defineConfig({
  site: "https://dontshoot11.github.io",
  build: {
    assets: "assets",
  },
  integrations: [svelte(), relativeLinks()],
});