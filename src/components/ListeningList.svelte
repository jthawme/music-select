<script>
  import database from "../utils/database";
  import { albums, info, isListening } from "../store/data";
  import Title from "./Title.svelte";
  import AlbumCard from "./Cards/AlbumCard.svelte";

  function filterAlbums(results, listening) {
    return results.filter(album => isListening(listening, album.uid));
  }
</script>

<Title icon="disc">Listening</Title>

{#each filterAlbums($albums, $info.listening) as item (item.uid)}
  <AlbumCard {...item} isListening />
{/each}
