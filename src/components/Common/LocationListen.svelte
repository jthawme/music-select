<script context="module">
  import { writable } from "svelte/store";

  export const activeRoute = writable(null);
</script>

<script>
  import { onMount } from "svelte";
  import { globalHistory } from "svelte-routing/src/history";

  onMount(() => {
    activeRoute.set(globalHistory.location.pathname);

    globalHistory.listen(history => {
      activeRoute.set(history.location.pathname);
    });
  });
</script>
