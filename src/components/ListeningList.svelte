<script>
  import database from "../utils/database";
  import { sortedAlbums } from "../store/data";
  import Title from "./Title.svelte";
  import AlbumCard from "./Cards/AlbumCard.svelte";

  function filterAlbums(results) {
    return results.filter(album => album.isListening);
  }

  let sorted = [];
  $: sorted = filterAlbums($sortedAlbums);
</script>

<style lang="scss">
  p {
    margin-top: var(--size-unit-2);
  }
</style>

<Title icon="disc">Listening</Title>

{#each sorted as item (item.uid)}
  <AlbumCard {...item} isListening />
{/each}

{#if sorted.length === 0}
  <p>Not listening to any albums</p>
{/if}
