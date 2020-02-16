import { writable, get, derived } from "svelte/store";

import { userInfo } from "./auth";
import { db } from "../utils/firebase";
import { getUid } from "../utils/database";

export const loading = writable(false);
export const genres = writable({});
export const albums = writable([]);
export const sortedAlbums = derived(albums, $albums => {
  const albumList = Object.keys($albums).map(key => $albums[key]);
  albumList.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  albumList.sort((a, b) => {
    if (a.artist < b.artist) {
      return -1;
    }
    if (a.artist > b.artist) {
      return 1;
    }
    return 0;
  });

  return albumList;
});
export const info = writable({ listening: [] });

const dbStores = { genres, albums, info };

const getUserId = () => get(userInfo).id;
export const getUserRef = () => db.collection(getUserId());

export function listenTo(key, modify) {
  let ref = Array.isArray(key)
    ? getUserRef()
        .doc(key[0])
        .collection(key[1])
    : getUserRef().doc(key);

  ref.onSnapshot(doc => {
    if (modify) {
      modify(doc);
    } else if (doc.exists) {
      dbStores[key].set(doc.data());
    }
  });
}

export function ownsAlbum(artist, album) {
  const uid = getUid(artist, album);
  return get(albums).find(album => album.uid === uid);
}

export function isListening(listening, uid) {
  return listening.includes(uid);
}
