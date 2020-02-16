<script>
  import { createEventDispatcher } from "svelte";
  import database from "../utils/database";
  import { getImage } from "../utils/utils";
  import { IMAGE_SIZES } from "../utils/constants";

  import Button from "../components/Common/Button.svelte";

  export let name = "";
  export let artist = "";
  export let image = "";
  export let provider = "";

  const dispatch = createEventDispatcher();

  function setListening() {
    database.setListening(artist, name).then(() => {
      dispatch("added");
    });
  }
</script>

<style lang="scss">
  section {
    display: flex;

    flex-direction: column;
    align-items: center;

    text-align: center;
  }

  p {
    margin: 0;
  }

  .small {
    font-size: var(--font-size-small);

    margin-bottom: var(--size-unit-2);
  }

  .title {
    font-size: var(--font-size-xx-large);

    color: var(--color-accent);
    margin: var(--size-unit-4) 0 var(--size-unit-1);

    font-weight: var(--font-weight-regular);
  }

  .image {
    width: 300px;
    height: 300px;

    line-height: 0;
  }

  img {
    width: 100%;
  }

  .actions {
    display: flex;

    flex-direction: row;

    margin-top: var(--size-unit-2);

    :global(button) {
      margin: 0 var(--size-unit-1);
    }
  }
</style>

<section>
  <p class="small">Why not listen to:</p>
  <div class="image">
    <img src={getImage(image, { size: IMAGE_SIZES.NORMAL, provider })} alt="" />
  </div>
  <p class="title">{name}</p>
  <p class="small">{artist}</p>

  <div class="actions">
    <Button icon="check" type="secondary" on:click={() => setListening()}>
      Okay
    </Button>
    <Button icon="x" weak on:click={() => dispatch('next')}>Next</Button>
  </div>
</section>
