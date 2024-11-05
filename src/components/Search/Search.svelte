<script>
  import { throttle } from "astro-x-svelte-static-pages-generator";
  import { onMount } from "svelte";
  import { fetchData, loadMore } from "@store";
  import SearchInput from "./components/SearchInput/SearchInput.svelte";
  import SearchResults from "./components/SearchResults/SearchResults.svelte";

  export let inputPlaceholder;

  import styles from "./style.module.css";

  onMount(() => {
    fetchData();
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight;
      if (bottom) {
        loadMore();
      }
    };

    const throttledHandleScroll = throttle(() => handleScroll(), 200);

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  });
</script>

<div class={styles.wrapper}>
  <div class="container">
    <SearchInput {inputPlaceholder} />
    <SearchResults />
  </div>
</div>
