<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();

  onDestroy(() => {
    dispatch("unmount");
  });
</script>

<style lang="scss">
  .big-button {
    position: relative;

    transition: {
      property: opacity;
      duration: 0.15s;
    }

    &:active {
      opacity: 0.5;
    }

    svg {
      width: 100%;
    }

    .content {
      position: absolute;

      z-index: 5;

      display: flex;

      align-items: center;
      justify-content: center;

      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      padding: var(--size-unit-4);

      .main-text {
        font-size: var(--font-size-xx-large);
        color: var(--color-accent);
      }

      .action-text {
        position: absolute;

        bottom: var(--size-unit-4);
        left: 50%;

        transform: translate3d(-50%, 0, 0);
        padding: 10px;

        z-index: 10;

        font-size: var(--font-size-small);
        color: var(--color-accent-dark);
      }
    }
  }

  .refine {
    position: absolute;

    bottom: var(--size-unit-4);
    left: 50%;

    transform: translate3d(-50%, 0, 0);
    padding: 10px;

    z-index: 10;

    font-size: var(--font-size-small);
  }

  circle {
    stroke-dasharray: 804;
    stroke-dashoffset: 804;
    animation: dash 1s ease-out forwards;
    transform: rotate(90deg);
    transform-origin: center;
    stroke: var(--color-accent);
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 200;
    }
  }
</style>

<div class="big-button" transition:fade={{ duration: 500 }}>
  <svg viewBox="0 0 200 200" preserveAspectRatio="none" height="auto">
    <circle
      class="path"
      cx="100"
      cy="100"
      r="96"
      stroke-width="2"
      fill="none" />
  </svg>

  <button
    transition:fade={{ delay: 500, duration: 500 }}
    class="content"
    on:click|preventDefault={() => dispatch('suggestionrequest')}>
    <span class="main-text">What should I listen to?</span>
    <span class="action-text">Press here</span>
  </button>
</div>

<button
  in:fade={{ delay: 1000, duration: 500 }}
  out:fade={{ delay: 0, duration: 500 }}
  class="refine">
  Refine recommendation
</button>
