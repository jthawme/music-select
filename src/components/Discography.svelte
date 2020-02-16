<script>
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import Fuse from "fuse.js";

  import { sortedAlbums, isListening, info } from "../store/data";

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
      albums = $sortedAlbums.map(album => {
        return {
          ...album,
          isListening: isListening($info.listening, album.uid)
        };
      });
    } else {
      fuse.setCollection($sortedAlbums);
      albums = [...fuse.search(filter)].map(album => {
        return {
          ...album,
          isListening: isListening($info.listening, album.uid)
        };
      });
    }
  }
</script>

<style lang="scss">
  .pool {
    flex-grow: 1;
  }
</style>

<div class="pool">
  <VirtualList itemHeight={88} items={albums} itemKey="uid" let:item>
    <Wrapper>
      <AlbumCard {...item} />
    </Wrapper>
  </VirtualList>
</div>
