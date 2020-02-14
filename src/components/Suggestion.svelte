<script>
  import Button from "../components/Button.svelte";
</script>

<style lang="scss">
  section {
    display: flex;

    flex-direction: column;
    align-items: center;

    padding: var(--size-header) var(--size-unit-4) var(--size-unit-4);

    background-color: var(--color-accent-weak);
  }

  p {
    margin: 0;
  }

  .small {
    font-size: var(--font-size-small);

    margin-bottom: var(--size-unit-2);
  }

  .title {
    font-size: var(--font-size-x-large);

    color: var(--color-accent);
    margin: var(--size-unit-4) 0 var(--size-unit-1);

    font-weight: var(--font-weight-regular);
  }

  img {
    max-width: 300px;
    width: 65%;
  }

  .actions {
    display: flex;

    flex-direction: column;

    margin-top: var(--size-unit-2);

    :global(button) {
      margin-bottom: var(--size-unit-2);
    }
  }
</style>

<section>
  <p class="small">Why not listen to:</p>
  <img src="https://f4.bcbits.com/img/a3643784525_10.jpg" alt="" />
  <p class="title">Marigold</p>
  <p class="small">Pinegrove</p>

  <div class="actions">
    <Button icon="headphones">Add to listening</Button>
    <Button icon="refresh" weak>Next recommendation</Button>
    <Button icon="zap" type="tertiary">Advanced</Button>
  </div>
</section>
