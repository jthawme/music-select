<script>
  export let type = "text";
  export let placeholder = "";
  export let name = "";
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

<input {type} {name} {placeholder} />
