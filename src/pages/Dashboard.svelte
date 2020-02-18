<script>
  import { Route, Router } from "svelte-routing";

  import Header from "../components/Layout/Header.svelte";
  import ActionBar from "../components/Layout/ActionBar.svelte";
  import AddAlbum from "../components/AddAlbum/AddAlbum.svelte";
  import Footer from "../components/Layout/Footer.svelte";
  import LocationListen from "../components/Common/LocationListen.svelte";

  import Home from "./Home.svelte";
  import Library from "./Library.svelte";
  import Import from "./Import.svelte";
</script>

<style lang="scss">
  header {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;

    z-index: 20;

    @media screen and (min-width: 768px) {
      width: 250px;
    }
  }

  aside {
    position: fixed;

    bottom: 0;
    left: 0;

    width: 100%;

    z-index: 15;

    @media screen and (min-width: 768px) {
      position: relative;
      grid-area: nav;
    }
  }

  main {
    display: flex;

    padding-bottom: var(--size-action-bar);
    min-height: 100vh;

    :global(> *) {
      width: 100%;
    }

    @media screen and (min-width: 768px) {
      grid-area: content;
      padding-bottom: 0;
    }
  }

  :global(body) {
    @media screen and (min-width: 768px) {
      display: grid;

      grid-template-areas:
        "nav content"
        "nav content";
      grid-template-columns: 250px 1fr;
      grid-template-rows: var(--size-header) 1fr;
    }
  }
</style>

<LocationListen />

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
    <Route path="/import" component={Import} />
    <Route path="/" component={Home} />
  </Router>
</main>
