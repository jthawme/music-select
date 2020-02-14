<script>
  import Icon from "../Icon.svelte";

  export let el = "p";
  export let icon = "";

  function getType(el) {
    switch (el) {
      case "h1":
        return "h1";
      case "p":
      default:
        return "p";
    }
  }

  $: elType = getType(el);
</script>

<style lang="scss">
  .title {
    display: flex;

    align-items: center;
    justify-content: space-between;

    padding: 0;
    margin: 0;

    span {
      font-size: var(--font-size-x-large);
      font-weight: var(--font-weight-regular);
    }
  }
</style>

{#if elType === 'h1'}
  <h1 class="title">
    <span>
      <slot />
    </span>
    {#if icon}
      <Icon size="32" name={icon} />
    {/if}
  </h1>
{:else if elType === 'p'}
  <p class="title">
    <span>
      <slot />
    </span>
    {#if icon}
      <Icon size="32" name={icon} />
    {/if}
  </p>
{/if}
