<script>
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import Fuse from "fuse.js";

  import { sortedAlbums, isListening, listening } from "../store/data";

  import AlbumCard from "./Cards/AlbumCard.svelte";
  import Wrapper from "./Layout/Wrapper.svelte";
  import Title from "./Layout/Title.svelte";

  const options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      {
        name: "artist",
        weight: 0.3
      },
      {
        name: "name",
        weight: 0.7
      }
    ]
  };
  const fuse = new Fuse([], options);

  export let filter = "";

  let albums = [];

  $: {
    if (!filter.trim()) {
      albums = $sortedAlbums;
    } else {
      fuse.setCollection($sortedAlbums);
      albums = [...fuse.search(filter)];
    }
  }
</script>

<style lang="scss">
  .pool {
    flex-grow: 1;
  }

  .center {
    display: flex;

    align-items: center;
    justify-content: center;
  }

  p {
    text-align: center;
    color: var(--color-background-dark);
  }
</style>

<div class="pool" class:center={albums.length === 0}>
  {#if albums.length === 0}
    <Wrapper>
      <p>No albums added yet</p>
    </Wrapper>
  {:else}
    <VirtualList itemHeight={88} items={albums} itemKey="uid" let:item>
      <Wrapper>
        <AlbumCard {...item} />
      </Wrapper>
    </VirtualList>
  {/if}
</div>
