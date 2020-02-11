<script>
  import { link } from "svelte-routing";
  import Icon from "./Icon.svelte";

  export let icon = "";
  export let onClick = () => {};
  export let to;

  export let type = "primary"; // primary / secondary / tertiary
  export let weak = false;

  export let noPadding;
  export let noButtonMargin;

  export let size = "normal";

  function getIconSize() {
    return {
      normal: "18",
      large: "24"
    }[size];
  }
</script>

<style lang="scss">
  a,
  button {
    display: flex;

    align-items: center;
    justify-content: center;

    padding: 10px 20px;
    border-radius: 32px;

    text-decoration: none;

    outline: none;
    border: 0;
  }

  .primary {
    background-color: var(--color-accent);
    color: white;
  }

  .primary.weak {
    background-color: var(--color-accent-dark);
  }

  .tertiary {
    background-color: transparent;
    color: inherit;
  }

  .noPadding {
    padding: 0;
  }

  .icon {
    margin-right: 6px;
    margin-top: 2px;
  }

  .noButtonMargin .icon {
    margin-right: 0;
  }
</style>

{#if to}
  <a
    href={to}
    use:link
    class:noPadding
    class:noButtonMargin
    class:weak
    class={type}>
    {#if icon}
      <span class="icon">
        <Icon size={getIconSize()} name={icon} />
      </span>
    {/if}
    <slot />
  </a>
{:else}
  <button
    on:click={onClick}
    class:noPadding
    class:noButtonMargin
    class:weak
    class={type}>
    {#if icon}
      <span class="icon">
        <Icon size={getIconSize()} name={icon} />
      </span>
    {/if}
    <slot />
  </button>
{/if}
