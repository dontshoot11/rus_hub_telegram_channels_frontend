<script>
  import { searchQuery } from "@store";
  import styles from "./style.module.css";

  let { inputPlaceholder } = $props();

  let query = $state("");

  $effect(() => {
    query && searchQuery.set(query);
  });
</script>

<div class={styles.inputWrap}>
  <input
    class={styles.input}
    placeholder={inputPlaceholder}
    bind:value={query}
    type="text"
  />
</div>
