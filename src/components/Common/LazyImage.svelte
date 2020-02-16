<script context="module">
  function loadImage(src) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });
  }
</script>

<script>
  export let src;
  export let alt = "";

  $: isLoaded = false;

  function runLoad() {
    isLoaded = false;
    loadImage(src).then(() => {
      isLoaded = true;
    });
  }

  $: src && runLoad();
</script>

<style>
  img {
    opacity: 0;

    transition-duration: 0.25s;
    transition-property: opacity;

    max-width: 100%;
  }

  .isLoaded {
    opacity: 1;
  }
</style>

<img class:isLoaded src={isLoaded ? src : ''} {alt} />
