<script>
  import { albums } from "../store/data";
  import DiscographyItem from "./DiscographyItem.svelte";
</script>

<style lang="scss">
  div {
    display: flex;
    flex-wrap: wrap;
  }
</style>

<div>
  {#each Object.values($albums) as item}
    <DiscographyItem {...item} />
  {/each}
</div>
