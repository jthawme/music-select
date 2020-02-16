<script>
  import Fuse from "fuse.js";
  import api from "../../utils/api";
  import database from "../../utils/database";
  import { albums, loading, ownsAlbum } from "../../store/data";

  import Wrapper from "../Layout/Wrapper.svelte";
  import AddAlbumForm from "./AddAlbumForm.svelte";
  import AlbumCardSlim from "../Cards/AlbumCardSlim.svelte";
  import Button from "../Common/Button.svelte";
  import Icon from "../Common/Icon.svelte";

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

  const options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["artist"]
  };
  const fuse = new Fuse([], options);

  function sortResults(results, artist) {
    if (artist) {
      fuse.setCollection(results);
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

  function convertAlbums(albumResults, albumList) {
    return albumResults.map(album => {
      return { ...album, owns: ownsAlbum(album.artist, album.name) };
    });
  }
</script>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;

    z-index: 10;

    background-color: white;

    overflow: auto;
  }

  .form {
    padding-top: var(--size-header);
    background-color: var(--color-accent-weak);
    --color-background-light: white;
  }

  .results {
    flex-grow: 1;

    padding: var(--size-unit-4) var(--size-unit-4) var(--size-action-bar);

    background-color: var(--color-background-light);
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
    color: var(--color-accent-dark);
  }
</style>

<section>
  <div class="form">
    <Wrapper>
      <AddAlbumForm on:submit={onSubmit} />
    </Wrapper>
  </div>
  <div class="results">
    {#if fetchAlbums}
      {#await fetchAlbums}
        Loading
      {:then results}

        {#if results.length === 0}
          <p>No results</p>
        {/if}

        {#each convertAlbums(results.slice(0, resultsLength), $albums) as result}
          <AlbumCardSlim
            artist={result.artist}
            album={result.name}
            image={result.image[result.image.length - 1]['#text']}>
            {#if result.owns}
              <Icon name="check" />
            {:else}
              <Button
                size="small"
                on:click={() => addAlbumToDatabase(result.mbid, result.artist, result.name)}
                disabled={$loading}>
                Add
              </Button>
            {/if}
          </AlbumCardSlim>
        {/each}

        {#if results.length > resultsLength}
          <div class="more">
            <Button
              type="tertiary"
              on:click={increaseResults}
              icon="cornerLeftDown">
              More results
            </Button>
          </div>
        {/if}
      {/await}
    {/if}
  </div>
</section>
