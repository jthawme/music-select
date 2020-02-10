<script>
  import { Route, Router } from "svelte-routing";

  import Header from "../components/Layout/Header.svelte";
  import ActionBar from "../components/Layout/ActionBar.svelte";

  import Home from "./Home.svelte";
  import Library from "./Library.svelte";
</script>

<style>
  header {
    position: fixed;

    top: 0;
    left: 0;

    width: 100%;
  }

  aside {
    position: fixed;

    bottom: 0;
    left: 0;

    width: 100%;
  }
</style>

<header>
  <Header />
</header>

<aside>
  <ActionBar />
</aside>

<Router>
  <Route path="/library" component={Library} />
  <Route path="/" component={Home} />
</Router>
