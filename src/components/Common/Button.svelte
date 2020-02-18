<script>
  import { link } from "svelte-routing";
  import Icon from "./Icon.svelte";

  export let icon = "";
  export let to = false;

  export let buttonType = "button";
  export let type = "primary"; // primary / secondary / tertiary
  export let weak = false;

  export let noPadding = false;
  export let noButtonMargin = false;

  export let size = "normal";

  export let disabled = false;
  export let reverse = false;
  export let native = false;

  function getIconSize() {
    return {
      normal: "18",
      large: "24"
    }[size];
  }

  function possibleLink(node) {
    if (native) {
      return null;
    }

    return link(node);
  }
</script>

<style lang="scss">
  a,
  button {
    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 32px;

    text-decoration: none;

    outline: none;
    border: 0;

    cursor: pointer;

    border-color: var(--color-background-light);
    border-width: 2px;
    border-style: solid;

    background-color: transparent;
  }

  .reverse {
    flex-direction: row-reverse;
  }

  .primary {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  .primary.weak {
    border-color: var(--color-accent-dark);
    color: var(--color-accent-dark);
  }

  .secondary {
    border-color: var(--color-success);
    color: var(--color-success);
  }

  .tertiary {
    border: 0;
    background-color: transparent;
    color: inherit;
  }

  .icon {
    margin-right: 6px;
    margin-top: 2px;
  }

  .reverse .icon {
    margin-left: 6px;
    margin-right: 0;
  }

  .noButtonMargin .icon {
    margin-right: 0;
  }

  .small {
    padding: 5px 10px;

    font-size: var(--font-size-small);
  }

  .normal {
    padding: 10px 20px;

    font-size: var(--font-size-normal);
  }

  .noPadding {
    padding: 0;
  }

  a[disabled],
  button[disabled] {
    opacity: 0.5;

    cursor: default;
  }
</style>

{#if to}
  <a
    on:click
    href={to}
    use:possibleLink
    class:noPadding
    class:reverse
    class:noButtonMargin
    class:weak
    class={`${type} ${size}`}>
    {#if icon}
      <span class="icon">
        <Icon size={getIconSize()} name={icon} />
      </span>
    {/if}
    <slot />
  </a>
{:else}
  <button
    on:click
    class:noPadding
    class:reverse
    class:noButtonMargin
    class:weak
    {disabled}
    class={`${type} ${size}`}
    type={buttonType}>
    {#if icon}
      <span class="icon">
        <Icon size={getIconSize()} name={icon} />
      </span>
    {/if}
    <slot />
  </button>
{/if}
