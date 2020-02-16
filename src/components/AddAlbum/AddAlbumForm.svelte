<script>
  import {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_IMPORT_STATE
  } from "../../utils/constants";
  import { getSpotifyUrl } from "../../utils/utils";
  import Title from "../Layout/Title.svelte";
  import Row from "../Forms/Row.svelte";
  import Label from "../Forms/Label.svelte";
  import Input from "../Forms/Input.svelte";
  import Button from "../Common/Button.svelte";
</script>

<style lang="scss">
  form {
    padding-top: var(--size-unit-4);
    padding-bottom: var(--size-unit-4);
  }

  .line {
    display: flex;

    align-items: center;

    p {
      padding-left: var(--size-unit-2);
      font-size: var(--font-size-small);

      a {
        color: var(--color-accent);
        text-decoration: none;
      }
    }
  }
</style>

<form on:submit|preventDefault>
  <Title icon="disc">Add Album</Title>
  <Row>
    <Label title="Album">
      <Input autofocus type="search" name="album" />
    </Label>
  </Row>
  <Row>
    <Label title="Artist (Optional)">
      <Input type="search" name="artist" />
    </Label>
  </Row>
  <Row>
    <div class="line">
      <Button buttonType="submit" icon="search">Search</Button>
      <p>
        or
        <a href={getSpotifyUrl()}>import from spotify</a>
      </p>
    </div>
  </Row>
</form>
