<script>
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  import { SPOTIFY_IMPORT_STATE, PROVIDER_TYPES } from "../utils/constants";
  import { getSpotifyUrl } from "../utils/utils";
  import { db } from "../utils/firebase";
  import { addAlbum } from "../utils/database";

  import Button from "../components/Common/Button.svelte";

  let isValid = true;
  let token = null;
  let currentPage = 0;
  let totalPages = 0;

  $: {
    if (!window.location.hash) {
      isValid = false;
    } else {
      const obj = {};
      window.location.hash
        .substring(1)
        .split("&")
        .forEach(str => {
          const value = str.split("=");
          obj[value[0]] = value[1];
        });

      if (obj.state !== localStorage.getItem(SPOTIFY_IMPORT_STATE)) {
        isValid = false;
      }

      token = obj.access_token;
    }
  }

  $: getAlbums(token);

  function getAlbums(accessToken) {
    return new Promise((resolve, reject) => {
      const getList = url => {
        fetch(url, {
          headers: {
            Authorization: "Bearer " + accessToken
          }
        })
          .then(resp => resp.json())
          .then(data => {
            currentPage = Math.ceil(data.offset / data.limit) + 1;
            totalPages = Math.ceil(data.total / data.limit);

            const batch = db.batch();
            data.items.forEach(({ album }) => {
              addAlbum(
                batch,
                album.id,
                PROVIDER_TYPES.SPOTIFY,
                album.artists[0].name,
                album.name,
                album.images[0].url,
                []
              );
            });

            batch.commit().then(() => {
              if (data.next) {
                getList(data.next);
              } else {
                resolve();
              }
            });
          });
      };

      getList("https://api.spotify.com/v1/me/albums");
    });
  }
</script>

<style lang="scss">
  section {
    display: flex;

    flex-direction: column;

    align-items: center;
    justify-content: center;

    background-color: var(--color-accent-weak);
  }

  .success {
    display: flex;

    flex-direction: column;

    align-items: center;

    span {
      // color: var(--color-accent);

      font-family: "Coplestons", monospace;
      font-size: 20vw;
      line-height: 0.8;

      &:nth-child(3) {
        margin-bottom: var(--size-unit-2);
      }
    }
  }

  p {
    text-align: center;
  }
</style>

<section>
  {#if isValid}
    {#if totalPages > 0 && currentPage === totalPages}
      <div
        class="success"
        transition:fly|local={{ duration: 300, x: 0, y: 20, opacity: 0.5, easing: quintOut }}>
        <span>You're</span>
        <span>All</span>
        <span>Set</span>
        <Button to="/">Go home</Button>
      </div>
    {:else}
      <p>
        Importing your albums
        <br />
        {currentPage} / {totalPages}
      </p>
    {/if}
  {:else}
    <p>Not a valid import</p>
    <p>
      <Button to={getSpotifyUrl()}>Try again</Button>
    </p>
  {/if}
</section>
