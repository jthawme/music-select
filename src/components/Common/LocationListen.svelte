<script>
  import { onMount } from "svelte";
  import { globalHistory } from "svelte-routing/src/history";

  export let activeRoute = null;

  onMount(() => {
    activeRoute = globalHistory.location.pathname;

    globalHistory.listen(history => {
      activeRoute = history.location.pathname;
    });
  });
</script>
