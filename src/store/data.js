import { writable, get, derived } from "svelte/store";

import { getUid } from "../utils/utils";

export const loading = writable(false);
export const genres = writable({});
export const albums = writable([]);
export const listening = writable([]);

/**
 * Sorts album list into array and also
 * attaches utility info to the object too
 */
export const sortedAlbums = derived(
  [albums, listening],
  ([$albums, $listening]) => {
    const albumList = $albums.map(album => {
      return {
        ...album,
        isListening: isListening($listening, album.uid)
      };
    });

    // Sort by album name
    albumList.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    // Sort by artist name
    albumList.sort((a, b) => {
      if (a.artist.toLowerCase() < b.artist.toLowerCase()) {
        return -1;
      }
      if (a.artist.toLowerCase() > b.artist.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    return albumList;
  }
);

export const listeningAlbums = derived(sortedAlbums, $sortedAlbums => {
  return $sortedAlbums.filter(album => album.isListening);
});

export function ownsAlbum(artist, album) {
  const uid = getUid(artist, album);
  return get(albums).find(album => album.uid === uid);
}

export function isListening(listening, uid) {
  return listening.includes(uid);
}
