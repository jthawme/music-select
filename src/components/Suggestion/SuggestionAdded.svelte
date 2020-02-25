<script>
  import { fly } from "svelte/transition";
  import Icon from "../Common/Icon.svelte";
  import Button from "../Common/Button.svelte";
</script>

<style lang="scss">
  .container {
    display: flex;

    flex-direction: column;
    align-items: center;
  }

  .icon {
    display: flex;

    align-items: center;
    justify-content: center;

    width: 56px;
    height: 56px;

    color: var(--color-accent-dark);

    :global(svg) {
      animation: {
        iteration-count: infinite;
        name: BOUNCE;
        direction: alternate;
        duration: 1s;
        timing-function: cubic-bezier(0.86, 0, 0.07, 1);
      }
    }
  }

  h1 {
    margin: var(--size-unit-2) 0 var(--size-unit-8);
  }

  @keyframes BOUNCE {
    to {
      transform: translate3d(0, -10%, 0) scale(1.1) rotate(10deg);
    }
  }
</style>

<div class="container" transition:fly={{ duration: 500, opacity: 0, y: 50 }}>
  <div class="icon" in:fly={{ duration: 500, delay: 250, opacity: 0, y: 20 }}>
    <Icon name="check" size="48" />
  </div>
  <h1>Great choice</h1>
  <div in:fly={{ duration: 500, delay: 1000, opacity: 0, y: 20 }}>
    <Button>Add another?</Button>
  </div>
</div>
