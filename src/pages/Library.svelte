<script>
  import Discography from "../components/Discography.svelte";
  import Label from "../components/Forms/Label.svelte";
  import Input from "../components/Forms/Input.svelte";
  import Wrapper from "../components/Layout/Wrapper.svelte";

  let filterValue = "";

  $: {
    console.log(filterValue);
  }
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    background-color: var(--color-background-light);
  }

  .filter {
    padding-top: calc(var(--size-header) + var(--size-unit-4));
    padding-bottom: var(--size-unit-4);
    background-color: var(--color-accent-weak);

    :global(input) {
      --color-background-light: white;
    }
  }
</style>

<div class="container">
  <div class="filter">
    <Wrapper>
      <Label title="Filter">
        <Input
          placeholder="Type here..."
          type="search"
          bind:value={filterValue} />
      </Label>
    </Wrapper>
  </div>
  <Discography />
</div>
