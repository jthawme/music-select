<script>
  import database from "../utils/database";
  import { info } from "../store/data";
  import Title from "./Title.svelte";
  import AlbumCard from "./Cards/AlbumCard.svelte";
</script>

<style lang="scss">
  section {
    padding: var(--size-unit-4);

    background-color: var(--color-background-light);
  }
</style>

<section>
  <Title icon="disc">Listening</Title>

  {#each database.getFromIds($info.listening) as item}
    <AlbumCard {...item} />
  {/each}
</section>
