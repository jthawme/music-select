<script>
  import { onMount } from "svelte";
  export let type = "text";
  export let placeholder = "";
  export let name = "";
  export let value = "";
  export let autofocus = false;

  const handleInput = e => {
    // in here, you can switch on type and implement
    // whatever behaviour you need
    value = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;
  };
</script>

<style lang="scss">
  input {
    width: 100%;

    padding: var(--size-unit-2);

    background-color: var(--color-background-light);
    border: 0;
    border-radius: var(--size-radii-md);

    outline: 0;
  }
</style>

<input {type} {name} {placeholder} {autofocus} on:input={handleInput} />
