<script>
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import { sortedAlbums, isListening } from "../store/data";

  import AlbumCard from "./Cards/AlbumCard.svelte";
  import Wrapper from "./Layout/Wrapper.svelte";
  import Title from "./Layout/Title.svelte";
</script>

<style lang="scss">
  .pool {
    flex-grow: 1;
  }
</style>

<div class="pool">
  <VirtualList items={$sortedAlbums} itemKey="uid" let:item>
    <Wrapper>
      <AlbumCard {...item} isListening={isListening(item.uid)} />
    </Wrapper>
  </VirtualList>
</div>
