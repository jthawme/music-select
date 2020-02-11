<script>
  import Button from "./Button.svelte";

  export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  export let min = 0;
  export let max = Number.MAX_SAFE_INTEGER;
  export let onUpdate;

  const MAX_HANDLE = 1;
  const MIN_HANDLE = 0;

  /* Reference for container */
  let wrapperRef;

  /* Width of container */
  let width = 0;

  /* Normalised positions of handles */
  let xPos = 0;

  /* Whether or not handles are being dragged */
  let dragging = false;

  /* The containers x positions to the screen */
  let wrapperOffsetX = 0;

  /* The last mouse X position in the window */
  let lastX = 0;

  let startX = 0;
  let deltaX = 0;

  /* Whether or not an update is being worked */
  let ticking = false;

  let touch = false;

  let open = false;

  let threshold = 100;

  function onMouseMove(e) {
    lastX = e.x;
    requestUpdate();
  }

  function onTouchMove(e) {
    lastX = e.touches[0].clientX;
    requestUpdate();
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function update() {
    let clampMin = -(width / 2);
    let clampMax = 0;

    deltaX = lastX - startX;

    xPos = clamp(deltaX, clampMin, clampMax);

    open = Math.abs(xPos) > threshold;

    ticking = false;

    // // If wanted to stop dragging when they meet
    // if (val >= clampMax || val <= clampMin) {
    //   onHandleUp();
    // }
  }

  function getContainerPosition() {
    wrapperOffsetX = wrapperRef.getBoundingClientRect().x;
  }

  function onHandleDown(e) {
    touch = !!e.touches;

    if (touch) {
      startX = e.touches[0].clientX;
    } else {
      startX = e.x;
    }

    xPos = open ? -threshold : 0;

    setDragging(true);
    getContainerPosition();
    registerMouseMove();
  }

  function onHandleUp() {
    setDragging(false);
    unregisterMouseMove();
  }

  function setDragging(value) {
    dragging = value;

    document.body.classList.toggle("grabbing", dragging);
  }

  function registerMouseMove() {
    if (!touch) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onHandleUp);
    } else {
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onHandleUp);
      window.addEventListener("touchcancel", onHandleUp);
    }
  }

  function unregisterMouseMove() {
    if (!touch) {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onHandleUp);
    } else {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onHandleUp);
      window.removeEventListener("touchcancel", onHandleUp);
    }
  }
</script>

<style lang="scss">
  .outer {
    position: relative;

    margin: var(--size-unit-2) 0;
  }

  .container {
    position: relative;

    z-index: 2;

    display: flex;

    align-items: center;

    background-color: white;
    border-radius: var(--size-radii-md);

    padding-right: var(--size-unit-2);

    overflow: hidden;
  }

  .animate .container {
    transition: {
      property: transform;
      duration: 0.15s;
    }
  }

  .open .container {
    transform: translate3d(-100px, 0, 0);
  }

  .image {
    line-height: 0;

    margin-right: var(--size-unit-2);
  }

  .info {
    flex-grow: 1;
  }

  .info p {
    margin: 0;
  }

  .image img {
    width: 64px;
    height: 64px;
  }

  .title {
    font-size: var(--font-size-large);
  }

  .artist {
    font-size: var(--font-size-x-small);
  }

  .cta {
    width: 64px;
    height: 20px;

    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("/images/arrow-left-long.png");
  }

  .actions {
    position: absolute;

    display: flex;

    align-items: center;

    z-index: 1;

    right: 0;
    top: 0;

    height: 100%;

    :global(button) {
      padding: 10px;
    }
  }
</style>

<div
  class="outer"
  class:animate={!dragging}
  class:open
  bind:this={wrapperRef}
  bind:clientWidth={width}>
  <div
    class="container"
    on:mousedown={onHandleDown}
    on:touchstart={onHandleDown}
    style={dragging && `transform: translate3d(${xPos}px, 0, 0)`}>
    <div class="image">
      <img src="https://f4.bcbits.com/img/a3643784525_10.jpg" alt="" />
    </div>
    <div class="info">
      <p class="title">Marigold</p>
      <p class="artist">Pinegrove</p>
    </div>
    <div class="cta" />
  </div>

  <div class="actions">
    <Button icon="stop" noButtonMargin noPadding size="large" type="tertiary" />
    <Button
      icon="trash"
      noButtonMargin
      noPadding
      size="large"
      type="tertiary" />
  </div>
</div>
