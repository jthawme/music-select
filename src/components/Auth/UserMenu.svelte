<script>
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  import LazyImage from "../Common/LazyImage.svelte";
  import Button from "../Button.svelte";

  export let id;
  export let name;
  export let image;

  let showMenu = false;

  function toggleMenu(force) {
    if (typeof force !== "undefined") {
      showMenu = force;
      return;
    }

    console.log(showMenu);

    showMenu = !showMenu;
  }
</script>

<style lang="scss">
  .container {
    position: relative;
  }

  .photo {
    width: 32px;
    height: 32px;

    overflow: hidden;

    line-height: 0;

    border-radius: 100%;

    background-color: var(--color-background-light);

    outline: 0;
    border: 0;

    padding: 0;
    margin: 0;
  }

  .menu {
    display: flex;

    flex-direction: column;

    position: absolute;

    right: 0;
    top: 36px;

    width: 150px;

    background-color: white;

    border-radius: var(--size-radii-md);

    box-shadow: 0 2px 5px -3px rgba(0, 0, 0, 0.5);
  }
</style>

<div class="container">
  <button class="photo" on:click|preventDefault={() => toggleMenu()}>
    {#if image}
      <LazyImage src={image} />
    {/if}
  </button>

  {#if showMenu}
    <aside
      class="menu"
      transition:fly={{ duration: 300, x: 0, y: -10, opacity: 0, easing: quintOut }}>
      <Button to="/about" type="tertiary">About</Button>
      <Button to="/privacy" type="tertiary">Privacy</Button>
      <Button reverse native to="/logout" type="tertiary" icon="logout">
        Sign out
      </Button>
    </aside>
  {/if}
</div>
