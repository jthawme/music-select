<script>
  import Fuse from "fuse.js";
  import api from "../utils/api";
  import SearchResult from "./SearchResult.svelte";

  let fetchAlbums;
  let artistSearch = "";
  let resultsLength = 5;

  function onSubmit(e) {
    const formData = new FormData(e.target);

    resultsLength = 5;
    fetchAlbums = api.search(formData.get("artist"), formData.get("album"));
  }

  function sortResults(results, artist, len) {
    if (artist) {
      const options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["artist"]
      };
      const fuse = new Fuse(results, options);
      return fuse.search(artist).slice(0, len);
    } else {
      return results.slice(0, len);
    }
  }
</script>

<style lang="scss">
  label {
    display: block;
  }

  .wrapper {
    display: grid;

    grid-template-columns: 250px 1fr;
    grid-gap: 10px;

    height: 100%;
  }

  form {
    padding: 20px;
  }

  .pool {
    overflow: auto;
  }
</style>

<div class="wrapper">
  <form on:submit|preventDefault={onSubmit}>
    <label>
      Album
      <br />
      <input type="search" placeholder="album" name="album" />
    </label>
    <label>
      Artist
      <br />
      <input type="search" placeholder="artist" bind:value={artistSearch} />
    </label>
    <button type="submit">Search</button>
  </form>

  <div class="pool">
    {#if fetchAlbums}
      {#await fetchAlbums}
        Loading
      {:then results}

        {#each sortResults(results, artistSearch, resultsLength) as result}
          <SearchResult
            name={result.name}
            artist={result.artist}
            image={result.image[result.image.length - 1]['#text']}
            mbid={result.mbid} />
        {/each}

        <button on:click={() => (resultsLength += 5)}>More results</button>
      {/await}
    {/if}
  </div>
</div>
