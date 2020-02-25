<script>
  import { PROVIDER_TYPES } from "../../utils/constants";
  import SuggestionButton from "./SuggestionButton.svelte";
  import SuggestionResult from "./SuggestionResult.svelte";
  import SuggestionAdded from "./SuggestionAdded.svelte";

  const SUGGESTION_STATES = {
    READY: "READY",
    RESOLVED: "RESOLVED",
    ADDED: "ADDED"
  };

  $: target = SUGGESTION_STATES.ADDED;
  $: loading = false;

  function onUnmount() {
    loading = false;
  }

  function onSuggestionRequest() {
    loading = true;
    target = SUGGESTION_STATES.RESOLVED;
  }

  function onSetListening() {
    loading = true;
    target = SUGGESTION_STATES.ADDED;
  }
</script>

<style lang="scss">
  section {
    position: relative;
    display: flex;

    flex-direction: column;

    justify-content: center;

    min-height: 80vh;

    padding: var(--size-header) var(--size-unit-4) var(--size-unit-4);

    background-color: var(--color-accent-weak);
  }
</style>

<section>
  {#if target === SUGGESTION_STATES.READY && !loading}
    <SuggestionButton
      on:unmount={onUnmount}
      on:suggestionrequest={onSuggestionRequest} />
  {:else if target === SUGGESTION_STATES.RESOLVED && !loading}
    <SuggestionResult
      name="Marigold"
      artist="Pinegrove"
      image="bde50cfa22ad4ddaa0d8c61ed20c7d5b.png"
      provider={PROVIDER_TYPES.LAST_FM}
      uid="YWxsIHRpbWUgbG93IUAhcHV0IHVwIG9yIHNodXQgdXA="
      on:setlistening={onSetListening}
      on:suggestionrequest={onSuggestionRequest}
      on:unmount={onUnmount} />
  {:else if target === SUGGESTION_STATES.ADDED && !loading}
    <SuggestionAdded />
  {/if}
</section>
