<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import { expoOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";
  import { getImage } from "../../utils/utils";
  import { IMAGE_SIZES } from "../../utils/constants";
  import LazyImage from "../Common/LazyImage.svelte";
  import Button from "../Common/Button.svelte";

  export let uid = "";
  export let artist = "";
  export let name = "";
  export let image = "";
  export let provider = "";

  const dispatch = createEventDispatcher();

  onDestroy(() => {
    dispatch("unmount");
  });
</script>

<style lang="scss">
  .container {
    display: flex;

    flex-direction: column;

    align-items: center;
  }

  .image {
    max-width: 250px;
  }

  .small {
    display: block;

    font-size: var(--font-size-small);
    color: var(--color-text);
  }

  .title {
    font-size: var(--font-size-x-large);

    color: var(--color-accent);

    text-align: center;
  }

  ul {
    display: flex;

    justify-content: center;

    list-style: none;

    padding: 0;
    margin: 0;

    li {
      margin: 0 var(--size-unit-1);
    }
  }
</style>

<div
  in:fly={{ delay: 500, duration: 1000, y: 50, opacity: 0, easing: expoOut }}
  out:fade={{ duration: 500 }}
  class="container">
  <p class="small">Why not try?</p>
  <div class="image">
    <LazyImage
      src={getImage(image, { provider, size: IMAGE_SIZES.NORMAL })}
      alt={name} />
  </div>
  <p class="title">
    {name}
    <span class="small">{artist}</span>
  </p>

  <ul>
    <li>
      <Button
        icon="check"
        type="secondary"
        on:click={() => dispatch('setlistening')}>
        Okay
      </Button>
    </li>
    <li>
      <Button icon="x" on:click={() => dispatch('suggestionrequest')}>
        Next
      </Button>
    </li>
  </ul>
</div>
