<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  export let replace = false;
  export let to = "";

  onMount(() =>
    navigate(to, {
      replace
    })
  );
</script>
