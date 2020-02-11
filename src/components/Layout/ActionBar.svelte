<script>
  import { link } from "svelte-routing";
  import { HomeIcon } from "svelte-feather-icons";
  import SearchForm from "../SearchForm.svelte";
  import Icon from "../Icon.svelte";
  import Button from "../Button.svelte";

  let search = false;

  function toggleSearch() {
    search = !search;
  }
</script>

<style lang="scss">
  .outer {
    position: relative;

    display: flex;

    justify-content: space-between;

    padding: 10px var(--size-unit-4);

    background-color: var(--color-accent);

    height: 64px;
  }

  nav {
    display: flex;

    color: white;
  }

  :global(nav a) {
    margin-right: 10px;
  }
</style>

<div class="outer">
  <nav>
    <Button to="/" icon="home" type="tertiary" noPadding>Home</Button>
    <Button to="/library" icon="music" type="tertiary" noPadding>
      Library
    </Button>
  </nav>

  <Button icon="plus" noPadding type="tertiary" size="large" />

  <!-- <button on:click={toggleSearch}>Add</button>

  {#if search}
    <div class="search">
      <SearchForm />
    </div>
  {/if} -->
</div>
