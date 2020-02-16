<script>
  import {
    HomeIcon,
    MaximizeIcon,
    MusicIcon,
    PlusCircleIcon,
    HexagonIcon,
    DiscIcon,
    ArrowLeftIcon,
    StopCircleIcon,
    Trash2Icon,
    HeadphonesIcon,
    RefreshCwIcon,
    ZapIcon,
    SearchIcon,
    CornerLeftDownIcon,
    LoaderIcon,
    PlayCircleIcon,
    CheckIcon,
    LogOutIcon,
    XIcon
  } from "svelte-feather-icons";

  export let name = "";
  export let size = "1x";

  const DEFAULT = "maximize";

  const icons = {
    home: HomeIcon,
    maximize: MaximizeIcon,
    music: MusicIcon,
    plus: PlusCircleIcon,
    hexagon: HexagonIcon,
    disc: DiscIcon,
    arrowLeft: ArrowLeftIcon,
    stop: StopCircleIcon,
    trash: Trash2Icon,
    headphones: HeadphonesIcon,
    refresh: RefreshCwIcon,
    zap: ZapIcon,
    search: SearchIcon,
    cornerLeftDown: CornerLeftDownIcon,
    loader: LoaderIcon,
    play: PlayCircleIcon,
    check: CheckIcon,
    logout: LogOutIcon,
    x: XIcon
  };

  function getIcon() {
    return icons[name] || icons[DEFAULT];
  }
</script>

<svelte:component this={getIcon()} {size} />
