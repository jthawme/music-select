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
    display: flex;

    flex-direction: column;
    min-height: 100vh;

    padding-top: var(--size-header);

    overflow: hidden;
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

  .content {
    position: relative;

    flex-grow: 1;

    margin-top: var(--size-unit-8);

    background-color: var(--color-accent);

    &:before {
      position: absolute;

      width: 120%;
      height: var(--size-unit-8);

      z-index: 0;

      bottom: calc(100% - var(--size-unit-4));

      content: "";

      background-color: var(--color-accent);

      transform: rotate(-5deg);
    }
  }

  h1 {
    position: relative;
    z-index: 1;
    font-size: var(--font-size-small);
    text-align: center;
  }

  p {
    max-width: calc(80% - var(--size-unit-8));

    font-size: var(--font-size-small);

    text-align: center;
    line-height: 1.4;

    padding: var(--size-unit-1) 0;
    margin: 0 auto;
  }

  a {
    color: white;
    text-decoration: none;
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

  <div class="content">
    <h1>Log in / Sign up</h1>
    <div class="login">
      <LoginButtons />
    </div>

    <p>Not bound by any platform, reconnect with the music in your life</p>
    <p>
      <a href="" use:link>How? Tell me more?</a>
    </p>
  </div>
</main>
