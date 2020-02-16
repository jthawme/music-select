<script>
  import LazyImage from "../Common/LazyImage.svelte";
  import Modal from "../Common/Modal.svelte";
  import Row from "../Forms/Row.svelte";
  import Button from "../Button.svelte";
  import Title from "../Layout/Title.svelte";
  import database, { getImage, IMAGE_SIZES } from "../../utils/database";

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  export let lastListened = null;
  export let dateAdded = null;
  export let id = null;
  export let uid = null;
  export let artist = "";
  export let name = "";
  export let image = "";
  export let isListening = false;

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
  let busy = false;

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
  }

  function getContainerPosition() {
    wrapperOffsetX = wrapperRef.getBoundingClientRect().x;
  }

  function onHandleDown(e) {
    if (busy) {
      return false;
    }

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

  let shouldDelete = false;

  function onTrash() {
    shouldDelete = true;
  }

  function confirmOnTrash() {
    busy = true;
    database.deleteAlbum(artist, name).then(() => (busy = false));
  }

  function onCloseModal() {
    shouldDelete = false;
    open = false;
  }

  function setListening() {
    busy = true;

    database.setListening(artist, name).then(() => {
      busy = false;
      open = false;
      isListening = true;
    });
  }

  function removeListening() {
    busy = true;

    database.removeListening(artist, name).then(() => {
      busy = false;
      open = false;
      isListening = false;
    });
  }
</script>

<style lang="scss">
  .outer {
    position: relative;

    width: 100%;

    padding: var(--size-unit-2) 0;
  }

  .busy {
    opacity: 0.5;
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

  .info {
    flex-grow: 1;
    min-width: 0;

    margin-right: var(--size-unit-2);
  }

  .info p {
    margin: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .image {
    flex-basis: 64px;
    flex-shrink: 0;
    line-height: 0;

    margin-right: var(--size-unit-2);

    background-color: var(--color-accent-weak);

    :global(img) {
      width: 64px;
      height: 64px;
    }
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

  .modal {
    :global(h3) {
      color: var(--color-accent);
    }
  }
</style>

<div
  class="outer"
  class:animate={!dragging}
  class:open
  class:busy
  bind:this={wrapperRef}
  bind:clientWidth={width}>
  <div
    class="container"
    on:mousedown={onHandleDown}
    on:touchstart={onHandleDown}
    style={dragging && `transform: translate3d(${xPos}px, 0, 0)`}>
    <div class="image">
      <LazyImage src={getImage(image, IMAGE_SIZES.SMALL)} alt="" />
    </div>
    <div class="info">
      <p class="title">{name}</p>
      <p class="artist">{artist}</p>
    </div>
    <div class="cta" />
  </div>

  <div class="actions">
    <Button
      icon="trash"
      noButtonMargin
      noPadding
      size="large"
      type="tertiary"
      on:click={onTrash} />
    {#if isListening}
      <Button
        icon="stop"
        noButtonMargin
        noPadding
        size="large"
        type="tertiary"
        on:click={removeListening} />
    {:else}
      <Button
        icon="play"
        noButtonMargin
        noPadding
        size="large"
        type="tertiary"
        on:click={setListening} />
    {/if}
  </div>
</div>

{#if shouldDelete}
  <Modal on:close={onCloseModal}>
    <span class="modal">
      <Title el="h3" size="medium">Really?</Title>
      <Row>
        <Button on:click={confirmOnTrash} icon="trash">Yes, I'm sure</Button>
      </Row>
    </span>
  </Modal>
{/if}
