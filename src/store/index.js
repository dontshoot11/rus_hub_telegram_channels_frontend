import { writable, derived } from "svelte/store";

export const dataStore = writable([]);
export const searchQuery = writable("");

export async function fetchData() {
  const response = await fetch("data.json");
  if (response.ok) {
    const data = await response.json();
    dataStore.update(() => data);
  } else {
    console.error("Failed to fetch data:", response.statusText);
  }
}

export const filteredData = derived(
  [dataStore, searchQuery],
  ([$dataStore, $searchQuery]) => {
    if (!$searchQuery) return $dataStore;
    return $dataStore.filter(
      (item) =>
        item.name.toLowerCase().includes($searchQuery.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes($searchQuery.toLowerCase()))
    );
  }
);
