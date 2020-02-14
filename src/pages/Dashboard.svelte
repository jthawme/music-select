<script>
  import { Route, Router } from "svelte-routing";

  import Header from "../components/Layout/Header.svelte";
  import ActionBar from "../components/Layout/ActionBar.svelte";
  import AddAlbum from "../components/AddAlbum/AddAlbum.svelte";
  import Footer from "../components/Layout/Footer.svelte";

  import Home from "./Home.svelte";
  import Library from "./Library.svelte";
</script>

<style lang="scss">
  header {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;

    z-index: 20;
  }

  aside {
    position: fixed;

    bottom: 0;
    left: 0;

    width: 100%;

    z-index: 20;
  }

  main {
    display: flex;

    min-height: calc(100vh - var(--size-action-bar));

    :global(> *) {
      width: 100%;
    }
  }

  :global(body.locked) {
    overflow: hidden;
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
    <Route path="/add" component={AddAlbum} />
    <Route path="/library" component={Library} />
    <Route path="/" component={Home} />
  </Router>
</main>

<Footer />
