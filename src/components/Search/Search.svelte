<script>
  import { onMount } from "svelte";
  import { fetchData } from "@store";
  import SearchInput from "./components/SearchInput/SearchInput.svelte";
  import SearchResults from "./components/SearchResults/SearchResults.svelte";
  export let placeholder;
  import styles from "./style.module.css";

  onMount(() => {
    fetchData();
  });
</script>

<div class={styles.wrapper}>
  <div class="container">
    <SearchInput {placeholder} />
    <SearchResults />
  </div>
</div>
