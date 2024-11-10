<script>
  import { onMount, afterUpdate } from "svelte";
  import { throttle } from "astro-x-svelte-static-pages-generator";

  import styles from "./style.module.css";

  export let item;

  let cardElement;

  const setRowSpans = () => {
    const gridContainer = cardElement && cardElement.parentElement;
    if (gridContainer) {
      gridContainer.querySelectorAll(`.${styles.card}`).forEach(setRowSpan);
    }
  };

  const wrapLinks = (input) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;

    return input.replace(urlPattern, (url) => {
      return `<br><a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  };

  const setRowSpan = (element) => {
    const cardHeight = element.offsetHeight;
    element.style.gridRowEnd = `span ${cardHeight + 16}`;
  };

  const throttledSetRowSpans = throttle(() => setRowSpans(), 200);

  onMount(() => {
    setRowSpan(cardElement);
    window.addEventListener("resize", throttledSetRowSpans);
  });

  afterUpdate(() => {
    setRowSpans();
  });
</script>

<a
  bind:this={cardElement}
  href={item.url}
  class={`${styles.card} ${item.premium && styles.premium}`}
>
  <div class={styles.image} style="background-image: url({item.image});"></div>
  {#if item.name}
    <h2 class={styles.heading}>{item.name}</h2>
  {/if}
  {#if item.description}
    <p class={styles.desc}>{@html wrapLinks(item.description)}</p>
  {/if}
</a>
