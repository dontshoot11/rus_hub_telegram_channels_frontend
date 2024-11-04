<script>
  export let inputPlaceholder;
  import { searchQuery } from "@store";
  import styles from "./style.module.css";

  let query = "";

  $: searchQuery.set(query);
</script>

<form class={styles.form} on:submit|preventDefault>
  <input
    class={styles.input}
    placeholder={inputPlaceholder}
    bind:value={query}
    type="text"
  />
</form>
