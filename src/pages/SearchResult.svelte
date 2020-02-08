<script>
  export let artist;
  export let name;
  export let image;
</script>

<style lang="scss">
  div {
    display: grid;

    grid-template-columns: min-content 1fr;
    grid-template-rows: min-content 1fr;
  }

  img {
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  h2 {
    grid-column: 2;
    grid-row: 1;
  }

  h3 {
    grid-column: 2;
    grid-row: 2;
  }
</style>

<div>
  <img src={image} alt={artist} />
  <h2>{name}</h2>
  <h3>{artist}</h3>
</div>
