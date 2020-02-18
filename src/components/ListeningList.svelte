<script>
  import { listeningAlbums } from "../store/data";
  import database from "../utils/database";
  import Title from "./Title.svelte";
  import AlbumCard from "./Cards/AlbumCard.svelte";
</script>

<style lang="scss">
  .center {
    display: flex;

    flex-direction: column;

    height: 100%;

    div {
      display: flex;

      align-items: center;
      justify-content: center;

      flex-grow: 1;
    }

    p {
      margin-top: var(--size-unit-2);
      color: var(--color-background-dark);
    }
  }
</style>

<div class:center={$listeningAlbums.length === 0}>
  <Title icon="disc">Listening</Title>

  {#each $listeningAlbums as item (item.uid)}
    <AlbumCard {...item} isListening />
  {/each}

  {#if $listeningAlbums.length === 0}
    <div>
      <p>Not listening to any albums</p>
    </div>
  {/if}
</div>
