<script>
  import { onMount } from "svelte";
  import { filteredData } from "@store";
  import SearchCard from "./components/SearchCard/SearchCard.svelte";
  import styles from "./style.module.css";
</script>

<ul class={styles.list}>
  {#each $filteredData as item}
    <SearchCard {item} />
  {/each}
</ul>
