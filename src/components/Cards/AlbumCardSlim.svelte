<script>
  import LazyImage from "../Common/LazyImage.svelte";

  export let image = "";
  export let artist = "";
  export let album = "";
</script>

<style lang="scss">
  .container {
    display: flex;

    align-items: center;

    margin-bottom: var(--size-unit-2);
  }

  .image {
    flex-basis: 64px;
    flex-shrink: 0;
    height: 64px;
    margin-right: var(--size-unit-2);
    background-color: var(--color-background-light);

    line-height: 0;

    img {
      width: 64px;
      height: 64px;
    }
  }

  .info {
    flex-grow: 1;
    min-width: 0;
    margin-right: var(--size-unit-2);

    p {
      margin: 0;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>

<div class="container">
  <div class="image">
    <LazyImage src={image} alt="" />
  </div>
  <div class="info">
    <p>
      {album}
      <br />
      {artist}
    </p>
  </div>
  <div class="actions">
    <slot />
  </div>
</div>
