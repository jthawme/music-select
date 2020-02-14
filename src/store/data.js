import { writable, get, derived } from "svelte/store";

import { userInfo } from "./auth";
import { db } from "../utils/firebase";

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

  return albumList;
});
export const listening = writable([]);

const dbStores = { genres, albums, listening };

const getUserId = () => get(userInfo).id;
export const getUserRef = () => db.collection(getUserId());

export function listenTo(key) {
  getUserRef()
    .doc(key)
    .onSnapshot(doc => {
      console.log(`setting ${key}`, doc.exists);
      if (doc.exists) {
        dbStores[key].set(doc.data());
      }
    });
}

export function isListening(uid) {
  return get(listening).includes(uid);
}
