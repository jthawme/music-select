<script>
  // import api from "../utils/api";
  import database from "../utils/database";

  export let artist;
  export let name;
  export let image;
  export let mbid;

  function addAlbum() {
    // api.addAlbum(mbid, artist, name, image).then(() => console.log("added"));
    database.addAlbum(mbid, artist, name);
  }
</script>

<style lang="scss">
  .container {
    display: flex;

    margin-bottom: 10px;
  }

  img {
    width: 100%;
  }

  .image {
    margin-right: 10px;
    width: 150px;
  }

  h2,
  h3 {
    font-size: 16px;
  }

  .info {
    flex: 1 0 0;
  }
</style>

<div class="container">
  <div class="image">
    <img src={image} alt={artist} />
  </div>
  <div class="info">
    <h2>{name}</h2>
    <h3>{artist}</h3>
    <button on:click={addAlbum}>Add</button>
  </div>
</div>
