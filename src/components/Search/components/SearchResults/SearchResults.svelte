<script>
  import { filteredData } from "@store";
  import SearchCard from "./components/SearchCard/SearchCard.svelte";
  import styles from "./style.module.css";

  export let donateText;

  let randomIndex = Math.floor(Math.random() * 5);
</script>

<ul class={styles.list}>
  {#each $filteredData as item, index}
    {#if index === randomIndex}
      <SearchCard donateButton={true} {donateText} />
    {:else}
      <SearchCard {item} />
    {/if}
  {/each}
</ul>
