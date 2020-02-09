import { get } from "svelte/store";
import api from "./api";
import { isLoggedIn } from "../store/auth";
import { genres, albums, info } from "../store/data";

const prepareTag = tag => {
  return tag
    .toLowerCase()
    .split("-")
    .join(" ");
};

export const getUid = (artist, album) => {
  return btoa(`${artist}!@!${album}`);
};

export const getImage = (image, size = 300) => {
  return `https://lastfm.freetls.fastly.net/i/u/${size}x${size}/${image}`;
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
  },
  setListening: (artist, album) => {
    checkedLoggedIn();

    return new Promise((resolve, reject) => {
      const currentInfo = get(info);
      const uid = getUid(artist, album);

      if (!currentInfo.listening.includes(uid)) {
        currentInfo.listening.push(uid);
      }

      info.set(currentInfo);

      resolve();
    });
  }
};

export default database;
