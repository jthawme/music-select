import { writable, get } from "svelte/store";

import { userInfo, isLoggedIn, hydratedData } from "./auth";
import { db } from "../utils/firebase";

export const genres = writable({});
export const albums = writable({});

const getUserId = () => get(userInfo).id;
const getUserRef = () => db.collection(getUserId());

export function subscribeData() {
  genres.subscribe(value => {
    if (!get(isLoggedIn) || !get(hydratedData)) {
      return false;
    }

    getUserRef()
      .doc("genres")
      .set(value);
  });
  albums.subscribe(value => {
    if (!get(isLoggedIn) || !get(hydratedData)) {
      return false;
    }

    getUserRef()
      .doc("albums")
      .set(value);
  });
}

export async function populateStores() {
  Promise.all([
    getUserRef()
      .doc("genres")
      .get(),
    getUserRef()
      .doc("albums")
      .get()
  ]).then(([genresDoc, albumsDoc]) => {
    console.log(albumsDoc.data());
    genresDoc.exists && genres.set(genresDoc.data());
    albumsDoc.exists && albums.set(albumsDoc.data());
  });
}
