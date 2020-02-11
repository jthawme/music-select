<script>
  import Icon from "./Icon.svelte";

  export let icon;
</script>

<style lang="scss">
  h1 {
    display: flex;

    align-items: center;
    justify-content: space-between;

    margin: 0;
  }
</style>

<h1>
  <span>
    <slot />
  </span>
  {#if icon}
    <Icon name={icon} />
  {/if}
</h1>
