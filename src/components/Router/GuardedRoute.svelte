<script>
  import { Router, Link, Route } from "svelte-routing";
  import Redirect from "./Redirect.svelte";

  import { hasResolvedLogin, isLoggedIn } from "../../store/auth";

  export let path = "";
  export let component = null;
  export let shouldBeLoggedOut = false;
  export let redirect = "";

  $: loginState = $hasResolvedLogin && $isLoggedIn;
</script>

<Route {path}>
  {#if $hasResolvedLogin}
    {#if ($isLoggedIn && !shouldBeLoggedOut) || (!$isLoggedIn && shouldBeLoggedOut)}
      <svelte:component this={component} />
    {:else if redirect}
      <Redirect to={redirect} />
    {/if}
  {:else}Not finished checking{/if}
</Route>
