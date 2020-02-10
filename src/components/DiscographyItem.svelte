<script>
  // import api from "../utils/api";
  import database, { getUid, getImage } from "../utils/database";
  import { info } from "../store/data";

  export let artist;
  export let name;
  export let image;

  function toggleListening() {
    if (!isListening) {
      database.setListening(artist, name);
    } else {
      database.removeListening(artist, name);
    }
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
  {isListening ? 'Listening' : ''}
  <button on:click={toggleListening}>Toggle Listening</button>
</div>
