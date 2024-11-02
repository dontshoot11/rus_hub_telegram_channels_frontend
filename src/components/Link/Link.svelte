<script>
  export let flexible;
  export let text;
  export let href;
  import styles from "./style.module.css";
</script>

<a class={`${styles.link} ${flexible && styles[flexible]}`} {href}>
  {text}
</a>
