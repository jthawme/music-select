<script context="module">
  import differenceInDays from "date-fns/differenceInDays";
  import { derived, writable } from "svelte/store";
  import { listeningAlbums } from "../store/data";

  const staleAlbums = derived(listeningAlbums, $listeningAlbums => {
    const today = new Date();

    return $listeningAlbums.filter(album => {
      return Math.abs(differenceInDays(today, album.lastListened.toDate())) > 3;
    });
  });

  const forceDismiss = writable(false);
</script>

<script>
  import { fade } from "svelte/transition";
  import database from "../utils/database";
  import Modal from "./Common/Modal.svelte";
  import Button from "./Common/Button.svelte";
  import AlbumCardSlim from "./Cards/AlbumCardSlim.svelte";
  import Title from "./Layout/Title.svelte";

  function closeModal() {
    forceDismiss.set(true);
  }

  function setListening(album) {
    database.setListening(album.artist, album.name, true);
  }

  function removeListening(album) {
    database.removeListening(album.artist, album.name);
  }
</script>

<style lang="scss">
  .actions {
    display: flex;

    :global(button) {
      margin-right: var(--size-unit-2);
    }
  }
</style>

{#if $staleAlbums.length > 0 && !$forceDismiss}
  <Modal on:close={closeModal}>
    <Title>Still Listening?</Title>
    <div transition:fade={{ duration: 300 }}>
      <AlbumCardSlim {...$staleAlbums[0]} />
    </div>
    <div class="actions">
      <Button
        type="success"
        size="small"
        icon="check"
        on:click={() => setListening($staleAlbums[0])}>
        Yes
      </Button>
      <Button
        type="success"
        size="small"
        icon="x"
        on:click={() => removeListening($staleAlbums[0])}>
        No
      </Button>
    </div>
  </Modal>
{/if}
