import { get } from "svelte/store";
import api from "./api";
import { isLoggedIn } from "../store/auth";
import { genres, albums } from "../store/data";

const prepareTag = tag => {
  return tag
    .toLowerCase()
    .split("-")
    .join(" ");
};

const getUid = (artist, album) => {
  return btoa(`${artist}!@!${album}`);
};

const checkedLoggedIn = () => {
  if (!get(isLoggedIn)) {
    throw new Error("Not logged in");
  }
};

const database = {
  addAlbum: (mbid, artist, album) => {
    checkedLoggedIn();
    return api.info(mbid, artist, album).then(albumInfo => {
      const uid = getUid(artist, album);
      const currentGenres = get(genres);
      albumInfo.tags.tag.forEach(tag => {
        let tagName = prepareTag(tag.name);
        if (!currentGenres[tagName]) {
          currentGenres[tagName] = [];
        }

        if (!currentGenres[tagName].includes(uid)) {
          currentGenres[tagName].push(uid);
        }
      });

      const currentAlbums = get(albums);
      currentAlbums[uid] = {
        id: mbid,
        name: albumInfo.name,
        artist: albumInfo.artist,
        image: albumInfo.image[0]["#text"].split("/").pop()
      };

      genres.set(currentGenres);
      albums.set(currentAlbums);
    });
  }
};

export default database;
