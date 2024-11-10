import { writable, derived } from "svelte/store";

export const dataStore = writable([]);
export const searchQuery = writable("");
export const displayLimit = writable(10);

function setInitialLimit() {
  if (window.innerWidth >= 1240) {
    displayLimit.set(20);
  } else if (window.innerWidth >= 960) {
    displayLimit.set(15);
  } else if (window.innerWidth >= 600) {
    displayLimit.set(10);
  } else {
    displayLimit.set(5);
  }
}

setInitialLimit();

export async function fetchData() {
  // const response = await fetch("http://18.193.109.68/");
  const response = await fetch("./data.json");
  if (response.ok) {
    const data = await response.json();
    const shuffledData = data.sort(() => 0.5 - Math.random());
    dataStore.set(shuffledData);
  } else {
    console.error("Failed to fetch data:", response.statusText);
  }
}

export const filteredData = derived(
  [dataStore, searchQuery, displayLimit],
  ([$dataStore, $searchQuery, $displayLimit]) => {
    const filtered = $dataStore.filter(
      (item) =>
        (item.name &&
          item.name.toLowerCase().includes($searchQuery.toLowerCase())) ||
        (item.url &&
          item.url.toLowerCase().includes($searchQuery.toLowerCase())) ||
        (item.tags &&
          item.tags.toLowerCase().includes($searchQuery.toLowerCase())) ||
        (item.description &&
          item.description.toLowerCase().includes($searchQuery.toLowerCase()))
    );

    return filtered.slice(0, $displayLimit);
  }
);

export function loadMore() {
  displayLimit.update((limit) => limit + 10);
}
