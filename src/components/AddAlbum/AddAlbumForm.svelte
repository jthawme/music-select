<script>
  import Title from "../Layout/Title.svelte";
  import Row from "../Forms/Row.svelte";
  import Label from "../Forms/Label.svelte";
  import Input from "../Forms/Input.svelte";
  import Button from "../Button.svelte";
</script>

<style lang="scss">
  form {
    padding-top: var(--size-unit-4);
    padding-bottom: var(--size-unit-4);
  }
</style>

<form on:submit|preventDefault>
  <Title icon="disc">Add Album</Title>
  <Row>
    <Label title="Album">
      <Input type="search" name="album" />
    </Label>
  </Row>
  <Row>
    <Label title="Artist (Optional)">
      <Input type="search" name="artist" />
    </Label>
  </Row>
  <Row>
    <Button buttonType="submit" icon="search">Search</Button>
  </Row>
</form>
