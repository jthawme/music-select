<script>
  import Title from "./Title.svelte";
  import AlbumCard from "./AlbumCard.svelte";
</script>

<style lang="scss">
  section {
    padding: var(--size-unit-4);

    background-color: var(--color-background-light);
  }
</style>

<section>
  <Title icon="disc">Listening</Title>

  <AlbumCard />
</section>
