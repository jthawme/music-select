<script>
  import { Router, Route } from "svelte-routing";

  import GuardedRoute from "../components/Router/GuardedRoute.svelte";
  import Dashboard from "./Dashboard.svelte";
  // import Login from "./Login.svelte";
  // import SignOut from "../components/Auth/SignOut.svelte";

  export let url = "";
</script>

<style>

</style>

<Router {url}>
  <!-- <GuardedRoute
    path="/login"
    component={Login}
    shouldBeLoggedOut
    redirect="/" />
  <Route path="/logout" component={SignOut} /> -->
  <GuardedRoute path="/*" component={Dashboard} redirect="/login" />
</Router>
