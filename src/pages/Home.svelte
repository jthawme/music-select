<script>
  import { info, albums, genres } from "../store/data";
  import database from "../utils/database";

  function getListeningAlbums(listeningIds) {
    return database.getFromIds(listeningIds);
  }
</script>

<style lang="scss">

</style>

{#if $info.listening.length === 0}
  nothing being listened to
{:else}
  {#await getListeningAlbums($info.listening)}
    loading
  {:then results}
    {#each results as album}{album.name}{/each}
  {/await}
{/if}
{Object.keys($genres).join(', ')}
