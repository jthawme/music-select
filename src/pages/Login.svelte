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

    @media screen and (min-width: 768px) {
      display: grid;

      grid-template-columns: 1fr 1fr;

      padding-top: 0;
    }
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
        padding-left: 5%;
      }

      &:nth-child(4) {
        text-align: right;
        padding-right: 10%;
      }
    }

    @media screen and (min-width: 768px) {
      align-items: center;
      justify-content: center;

      span {
        max-width: 400px;
        width: 100%;
        font-size: 90px;

        &:nth-child(3) {
          padding-left: 10%;
        }

        &:nth-child(4) {
          padding-right: 5%;
        }
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

    @media screen and (min-width: 768px) {
      display: flex;

      flex-direction: column;

      align-items: center;
      justify-content: center;

      margin-top: 0;

      &:before {
        display: none;
      }
    }
  }

  h1,
  p {
    font-size: var(--font-size-small);

    @media screen and (min-width: 768px) {
      font-size: var(--font-size-normal);
    }
  }

  h1 {
    position: relative;
    z-index: 1;
    text-align: center;
  }

  p {
    max-width: calc(80% - var(--size-unit-8));

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
