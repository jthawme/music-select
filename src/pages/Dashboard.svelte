<script>
  import { Route, Router } from "svelte-routing";

  import Header from "../components/Layout/Header.svelte";
  import ActionBar from "../components/Layout/ActionBar.svelte";

  import Home from "./Home.svelte";
  import Library from "./Library.svelte";
</script>

<style lang="scss">
  header {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;

    z-index: 10;
  }

  aside {
    position: fixed;

    bottom: 0;
    left: 0;

    width: 100%;

    z-index: 10;
  }

  main {
    padding-bottom: var(--size-action-bar);
  }
</style>

<header>
  <Header />
</header>

<aside>
  <ActionBar />
</aside>

<main>
  <Router>
    <Route path="/library" component={Library} />
    <Route path="/" component={Home} />
  </Router>
</main>
