<script>
  export let flexible;
  export let href;
  import styles from "./style.module.css";
</script>

<a class={`${styles.link} ${flexible && styles.flexible}`} {href}>
  <slot />
</a>
