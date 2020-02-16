<script>
  import { link } from "svelte-routing";
  import Wrapper from "./Wrapper.svelte";
</script>

<style lang="scss">
  footer {
    background-color: var(--color-background-light);
  }

  div {
    padding-top: var(--size-unit-4);
    padding-bottom: var(--size-unit-4);
  }

  ul {
    display: flex;

    justify-content: center;

    margin: 0;
    padding: 0;

    list-style: none;

    li {
      margin: 0 var(--size-unit-1);
    }

    a {
      font-size: var(--font-size-small);
      color: var(--color-background-dark);
      text-decoration: none;
    }
  }
</style>

<footer>
  <Wrapper>
    <div>
      <ul>
        <li>
          <a use:link href="/about">About</a>
        </li>
        <li>
          <a use:link href="/privacy">Privacy</a>
        </li>
      </ul>
    </div>
  </Wrapper>
</footer>
