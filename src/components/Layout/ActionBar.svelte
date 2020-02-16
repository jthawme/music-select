<script>
  import { link } from "svelte-routing";
  import Icon from "../Common/Icon.svelte";
  import Button from "../Common/Button.svelte";
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

  <Button icon="plus" to="/add" noPadding type="tertiary" size="large" />
</div>
