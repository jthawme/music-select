<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  import { getSuggestion, SUGGESTION_TYPES } from "../utils/suggestion";

  import Suggestion from "../components/Suggestion/Suggestion.svelte";
  import ListeningList from "../components/ListeningList.svelte";
  import StaleAlbums from "../components/StaleAlbums.svelte";
  import Button from "../components/Common/Button.svelte";
</script>

<style lang="scss">
  .container {
    display: flex;

    flex-direction: column;
  }

  .listening {
    flex-grow: 1;

    padding: var(--size-unit-4);

    background-color: var(--color-background-light);
  }
</style>

<div class="container">
  <Suggestion />

  <section class="listening">
    <ListeningList />
  </section>

  <StaleAlbums />
</div>
