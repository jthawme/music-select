<script>
  import { userInfo } from "../../store/auth";
  import Icon from "../Icon.svelte";
  import UserMenu from "../Auth/UserMenu.svelte";
</script>

<style lang="scss">
  .container {
    position: relative;

    padding: 14px 0;

    text-align: center;
  }

  .menu {
    position: absolute;

    top: 50%;
    right: var(--size-unit-4);

    transform: translate3d(0, -50%, 0);
  }
</style>

<div class="container">
  <Icon name="hexagon" size="32" />

  {#if $userInfo}
    <div class="menu">
      <UserMenu {...$userInfo} />
    </div>
  {/if}
</div>
