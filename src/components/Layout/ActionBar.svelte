<script>
  import { link } from "svelte-routing";
  import SearchForm from "../SearchForm.svelte";

  let search = false;

  function toggleSearch() {
    search = !search;
  }
</script>

<style lang="scss">
  .outer {
    position: relative;

    display: flex;

    align-items: center;

    background-color: red;

    padding: 10px;

    height: 64px;
  }

  .search {
    position: absolute;

    bottom: 100%;
    left: 0;

    width: 100%;
    height: calc(100vh - 64px);

    background-color: #e5e5e5;

    padding: 10px;
  }

  a {
    color: white;

    margin-right: 10px;
  }
</style>

<div class="outer">
  <a href="/" use:link>Home</a>
  <a href="/library" use:link>Library</a>
  <a href="/logout" use:link>Log Out</a>

  <button on:click={toggleSearch}>Add</button>

  {#if search}
    <div class="search">
      <SearchForm />
    </div>
  {/if}
</div>
