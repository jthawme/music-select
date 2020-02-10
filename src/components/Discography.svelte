<script>
  import { albums } from "../store/data";
  import DiscographyItem from "./DiscographyItem.svelte";
</script>

<style lang="scss">
  .pool {
    display: flex;

    flex-wrap: wrap;
  }
</style>

<div class="pool">
  {#each Object.values($albums) as item}
    <DiscographyItem {...item} />
  {/each}
</div>
