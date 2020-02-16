<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  import { getSuggestion, SUGGESTION_TYPES } from "../utils/suggestion";

  import Suggestion from "../components/Suggestion.svelte";
  import ListeningList from "../components/ListeningList.svelte";
  import Button from "../components/Common/Button.svelte";

  let wantsNext = false;
  let suggestion = null;

  function onSuggestionEnd() {
    if (wantsNext) {
      requestSuggestion();
    }
  }

  function onNext() {
    wantsNext = true;
    suggestion = null;
  }

  function onAdded() {
    wantsNext = false;
    suggestion = null;
  }

  function onClose() {
    wantsNext = false;
    suggestion = null;
  }

  function requestSuggestion(type) {
    if (suggestion) {
      suggestion = null;
      wantsNext = true;
    } else {
      wantsNext = false;
      getSuggestion(type).then(results => {
        suggestion = results.album;
      });
    }
  }
</script>

<style lang="scss">
  .container {
    display: flex;

    flex-direction: column;
  }

  .suggestion-actions {
    display: flex;

    flex-direction: column;

    padding: var(--size-unit-8) var(--size-unit-4);

    :global(button),
    :global(a) {
      margin-bottom: var(--size-unit-2);
    }

    :global(button:last-of-type),
    :global(a:last-of-type) {
      margin-bottom: 0;
    }
  }

  .topbox {
    padding-top: var(--size-header);

    background-color: var(--color-accent-weak);
  }

  .suggestion {
    padding: var(--size-unit-4);
  }

  .listening {
    flex-grow: 1;

    padding: var(--size-unit-4);

    background-color: var(--color-background-light);
  }
</style>

<div class="container">
  <div class="topbox">
    {#if suggestion}
      <div
        class="suggestion"
        transition:slide|local={{ delay: 100, duration: 600 }}
        on:outroend={onSuggestionEnd}
        on:introend={onSuggestionEnd}>
        <Suggestion
          on:next={onNext}
          on:added={onAdded}
          on:close={onClose}
          {...suggestion} />
      </div>
    {/if}
  </div>

  <section class="suggestion-actions">
    <Button icon="disc" on:click={requestSuggestion}>Get Recommendation</Button>
    <Button
      icon="refresh"
      weak
      on:click={() => requestSuggestion(SUGGESTION_TYPES.NOT_LISTENED)}>
      Something new
    </Button>
    <Button icon="zap" type="tertiary">Advanced</Button>
  </section>

  <section class="listening">
    <ListeningList />
  </section>
</div>
