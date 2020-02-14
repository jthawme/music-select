<script>
  import { albums, isListening } from "../store/data";

  import AlbumCard from "./Cards/AlbumCard.svelte";
  import Wrapper from "./Layout/Wrapper.svelte";
</script>

<style lang="scss">
  .pool {
    display: flex;

    flex-direction: column;

    padding-top: var(--size-header);
    background-color: var(--color-background-light);
  }
</style>

<div class="pool">
  {#each Object.values($albums) as item}
    <Wrapper>
      <AlbumCard {...item} isListening={isListening(item.uid)} />
    </Wrapper>
  {/each}
</div>
