import { writable, derived } from "svelte/store";

export const dataStore = writable([]);
export const searchQuery = writable("");
export const displayLimit = writable();

export async function fetchData() {
  const response = await fetch("data.json");
  if (response.ok) {
    const data = await response.json();
    const shuffledData = data.sort(() => 0.5 - Math.random());
    dataStore.set(shuffledData);
  } else {
    console.error("Failed to fetch data:", response.statusText);
  }
}

function setInitialLimit() {
  if (window.innerWidth >= 1240) {
    displayLimit.set(20);
    return;
  }
  if (window.innerWidth >= 960) {
    displayLimit.set(15);
    return;
  }
  if (window.innerWidth >= 600) {
    displayLimit.set(10);
    return;
  }

  displayLimit.set(5);
}

setInitialLimit();

export const filteredData = derived(
  [dataStore, searchQuery, displayLimit],
  ([$dataStore, $searchQuery, $displayLimit]) => {
    const filtered = $dataStore.filter(
      (item) =>
        item.name.toLowerCase().includes($searchQuery.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes($searchQuery.toLowerCase()))
    );

    return filtered.slice(0, $displayLimit);
  }
);

export function loadMore() {
  displayLimit.update((limit) => limit + 10);
}
