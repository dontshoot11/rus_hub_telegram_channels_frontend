<script>
  export let placeholder;
  import { searchQuery } from "@store";
  import styles from "./style.module.css";

  let query = "";

  $: searchQuery.set(query);
</script>

<div class="container">
  <form class={styles.form} on:submit|preventDefault>
    <input {placeholder} bind:value={query} type="text" />
  </form>
</div>
