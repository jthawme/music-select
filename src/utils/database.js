import { get } from "svelte/store";
import api from "./api";
import { isLoggedIn } from "../store/auth";
import { genres, albums, info, getUserRef, loading } from "../store/data";

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
    loading.set(true);
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
      currentAlbums.push({
        uid: uid,
        id: mbid,
        name: albumInfo.name,
        artist: albumInfo.artist,
        image: albumInfo.image[0]["#text"].split("/").pop(),
        lastListened: null,
        dateAdded: new Date()
      });

      genres.set(currentGenres);
      albums.set(currentAlbums);
      loading.set(false);
    });
  },
  setListening: (artist, album) => {
    checkedLoggedIn();

    return new Promise((resolve, reject) => {
      const currentInfo = get(info);
      const currentAlbums = get(albums);
      const uid = getUid(artist, album);

      if (!currentInfo.listening.includes(uid)) {
        currentInfo.listening.push(uid);

        const idx = currentAlbums.findIndex(album => album.uid === uid);

        currentAlbums[idx].lastListened = new Date();

        info.set(currentInfo);
        albums.set(currentAlbums);
      }

      resolve();
    });
  },
  removeListening: (artist, album) => {
    checkedLoggedIn();

    return new Promise((resolve, reject) => {
      const currentInfo = get(info);
      const uid = getUid(artist, album);
      const uidIndex = currentInfo.listening.indexOf(uid);

      if (uidIndex >= 0) {
        currentInfo.listening.splice(uidIndex, 1);

        info.set(currentInfo);
      }

      resolve();
    });
  },
  getFromIds: ids => {
    checkedLoggedIn();

    return getUserRef()
      .doc("albums")
      .collection("list")
      .where("uid", "in", ids)
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => doc.data());
      });
  }
};

export default database;
