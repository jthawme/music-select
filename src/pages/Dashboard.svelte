<script>
  import api from "../utils/api";
  import SearchResult from "./SearchResult.svelte";

  let fetchAlbums;

  function onSubmit(e) {
    const formData = new FormData(e.target);

    fetchAlbums = api.search(formData.get("artist"), formData.get("album"));
  }
</script>

<style>

</style>

<main>
  <form on:submit|preventDefault={onSubmit}>
    <label>
      Album
      <br />
      <input type="search" placeholder="album" name="album" />
    </label>
    <button type="submit">Search</button>
  </form>
  {#if fetchAlbums}
    {#await fetchAlbums}
      Loading
    {:then results}
      {#each results as result}
        <SearchResult
          name={result.name}
          artist={result.artist}
          image={result.image[result.image.length - 1]['#text']} />
      {/each}
    {/await}
  {/if}
</main>
