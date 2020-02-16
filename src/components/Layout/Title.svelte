<script>
  import Icon from "../Icon.svelte";

  export let el = "p";
  export let icon = "";
  export let size = "large";
</script>

<style lang="scss">
  .title {
    display: flex;

    align-items: center;
    justify-content: space-between;

    padding: 0;
    margin: 0;

    font-family: "Coplestons", monospace;
  }

  .small {
    span {
      font-size: var(--font-size-large);
      font-weight: var(--font-weight-regular);
    }
  }

  .medium {
    span {
      font-size: var(--font-size-x-large);
      font-weight: var(--font-weight-regular);
    }
  }

  .large {
    span {
      font-size: var(--font-size-xx-large);
      font-weight: var(--font-weight-regular);
    }
  }
</style>

{#if el === 'h1'}
  <h1 class="title {size}">
    <span>
      <slot />
    </span>
    {#if icon}
      <Icon size="32" name={icon} />
    {/if}
  </h1>
{:else if el === 'h3'}
  <h3 class="title {size}">
    <span>
      <slot />
    </span>
    {#if icon}
      <Icon size="32" name={icon} />
    {/if}
  </h3>
{:else}
  <p class="title {size}">
    <span>
      <slot />
    </span>
    {#if icon}
      <Icon size="32" name={icon} />
    {/if}
  </p>
{/if}
