<script>
  import Fuse from "fuse.js";
  import api from "../../utils/api";
  import database from "../../utils/database";
  import { loading } from "../../store/data";

  import Wrapper from "../Layout/Wrapper.svelte";
  import AddAlbumForm from "./AddAlbumForm.svelte";
  import AlbumCardSlim from "../Cards/AlbumCardSlim.svelte";
  import Button from "../Button.svelte";

  let fetchAlbums;
  let artistSearch = "";
  let resultsIncrease = 5;
  let resultsLength = resultsIncrease;

  function onSubmit(e) {
    const formData = new FormData(e.target);

    const artist = formData.get("artist");
    const album = formData.get("album");

    resultsLength = resultsIncrease;
    fetchAlbums = api.search(artist, album).then(results => {
      return sortResults(results, artist);
    });
  }

  function sortResults(results, artist) {
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
      return fuse.search(artist);
    } else {
      return results.slice();
    }
  }

  function increaseResults() {
    resultsLength += resultsIncrease;
  }

  function addAlbumToDatabase(mbid, artist, name) {
    if (!$loading) {
      database.addAlbum(mbid, artist, name);
    }
  }
</script>

<style lang="scss">
  section {
    min-height: 100vh;

    display: flex;
    flex-direction: column;

    z-index: 10;

    background-color: white;

    padding-top: var(--size-header);

    overflow: auto;
  }

  .results {
    flex-grow: 1;

    padding: var(--size-unit-4) var(--size-unit-4) var(--size-action-bar);

    background-color: var(--color-accent-weak);
  }

  .noResults {
    display: flex;

    align-items: center;
    justify-content: center;

    p {
      text-align: center;

      color: var(--color-accent-dark);
    }
  }

  .more {
    display: flex;

    justify-content: center;

    padding-top: var(--size-unit-2);
  }
</style>

<section>
  <Wrapper>
    <AddAlbumForm on:submit={onSubmit} />
  </Wrapper>
  <div class="results">
    {#if fetchAlbums}
      {#await fetchAlbums}
        Loading
      {:then results}

        {#if results.length === 0}
          <p>No results</p>
        {/if}

        {#each results.slice(0, resultsLength) as result}
          <AlbumCardSlim
            artist={result.artist}
            album={result.name}
            image={result.image[result.image.length - 1]['#text']}>
            <Button
              size="small"
              on:click={() => addAlbumToDatabase(result.mbid, result.artist, result.name)}
              disabled={$loading}>
              Add
            </Button>
          </AlbumCardSlim>
        {/each}

        {#if results.length > resultsLength}
          <div class="more">
            <Button on:click={increaseResults} icon="cornerLeftDown">
              More results
            </Button>
          </div>
        {/if}
      {/await}
    {/if}
  </div>
</section>
