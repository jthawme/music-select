<script>
  import { link } from "svelte-routing";
  import LoginButtons from "../components/Auth/LoginButtons.svelte";
  import Header from "../components/Layout/Header.svelte";
</script>

<style lang="scss">
  header {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;

    z-index: 20;
  }

  main {
    padding-top: var(--size-header);
  }

  .title {
    display: flex;

    flex-direction: column;

    span {
      font-family: "Coplestons", sans-serif;
      font-size: 20vw;
      line-height: 0.8;

      color: var(--color-accent);

      &:nth-child(2) {
        text-align: right;
      }

      &:nth-child(3) {
        padding-left: 5vw;
      }

      &:nth-child(4) {
        text-align: right;
        padding-right: 10vw;
      }
    }
  }

  h1 {
    font-size: var(--font-size-small);
    text-align: center;

    margin-top: var(--size-unit-8);
  }

  p {
    max-width: calc(80% - var(--size-unit-8));

    font-size: var(--font-size-small);

    text-align: center;
    line-height: 1.4;

    margin: var(--size-unit-2) auto;
  }

  a {
    color: var(--color-accent);
  }

  .login {
    margin-bottom: var(--size-unit-4);
  }
</style>

<header>
  <Header />
</header>

<main>
  <div class="title">
    <span>Re-</span>
    <span>Discover</span>
    <span>Your</span>
    <span>Music</span>
  </div>

  <h1>Log in / Sign up</h1>
  <div class="login">
    <LoginButtons />
  </div>

  <p>Not bound by any platform, reconnect with the music in your life</p>
  <p>
    <a href="" use:link>How? Tell me more?</a>
  </p>
</main>
