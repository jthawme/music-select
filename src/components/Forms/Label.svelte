<script>
  export let title = "";
  export let error = false;
</script>

<style lang="scss">
  label {
    display: flex;

    flex-direction: column;

    span {
      font-size: var(--font-size-small);
    }

    div {
      margin-top: var(--size-unit-2);
    }
  }
</style>

<label class:error>
  <span>{title}</span>
  <div>
    <slot />
  </div>
</label>
