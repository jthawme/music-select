<script>
  import api from "../utils/api";

  function onSubmit(e) {
    const formData = new FormData(e.target);

    api.search(formData.get("artist"), formData.get("album"));
  }
</script>

<style>

</style>

<main>
  <form on:submit|preventDefault={onSubmit}>
    <label>
      Artist
      <br />
      <input type="search" placeholder="artist" name="artist" />
    </label>
    <label>
      Album
      <br />
      <input type="search" placeholder="album" name="album" />
    </label>
    <button type="submit">Search</button>
  </form>
</main>
