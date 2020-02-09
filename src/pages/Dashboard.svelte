<script>
  import { Route, Router } from "svelte-routing";

  import Library from "./Library.svelte";

  import Fuse from "fuse.js";
  import api from "../utils/api";
  import SearchResult from "../components/SearchResult.svelte";
  import Discography from "../components/Discography.svelte";

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

<style>

</style>

<Router url="/">
  <Route path="/library" component={Library} />
  <Route path="/">
    <main>
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
    </main>
  </Route>
</Router>
