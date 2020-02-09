<script>
  // import api from "../utils/api";
  import database, { getUid, getImage } from "../utils/database";
  import { info } from "../store/data";

  export let artist;
  export let name;
  export let image;
  export let mbid;

  function setListening() {
    database.setListening(artist, name);
  }

  $: isListening = $info.listening.includes(getUid(artist, name));
</script>

<style lang="scss">
  div {
    display: grid;

    grid-template-columns: min-content 1fr;
    grid-template-rows: min-content 1fr;

    width: 300px;
  }

  img {
    grid-column: 1;
    grid-row: 1 / span 2;

    width: 150px;
  }

  h2 {
    grid-column: 2;
    grid-row: 1;
  }

  h3 {
    grid-column: 2;
    grid-row: 2;
  }

  button {
    grid-column: 1 / span 2;
    grid-row: 3;
  }
</style>

<div>
  <img src={getImage(image)} alt={artist} />
  <h2>{name}</h2>
  <h3>{artist}</h3>
  <button on:click={setListening} disabled={isListening}>Set Listening</button>
</div>
