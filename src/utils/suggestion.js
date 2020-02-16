import { get } from "svelte/store";
import { db } from "./firebase";
import { getUserRef, albums, info, isListening } from "../store/data";

export const SUGGESTION_TYPES = {
  RANDOM: "RANDOM",
  NOT_LISTENED: "NOT_LISTENED",
  LISTENED: "LISTENED"
};

let localListening = [];
info.subscribe(value => (localListening = value.listening));

function randomValue(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

function getRandomType() {
  return randomValue(Object.values(SUGGESTION_TYPES));
}

function notListeningAlbums() {
  return get(albums).filter(album => !isListening(localListening, album.uid));
}

function getAlbum(type) {
  switch (type) {
    case SUGGESTION_TYPES.NOT_LISTENED:
      return Promise.resolve(
        randomValue(
          notListeningAlbums().filter(album => album.lastListened === null)
        )
      );
    case SUGGESTION_TYPES.LISTENED:
      return Promise.resolve(
        randomValue(notListeningAlbums().filter(album => album.lastListened))
      );
    case SUGGESTION_TYPES.RANDOM:
    default:
      return Promise.resolve(randomValue(notListeningAlbums()));
  }
}

export function getSuggestion(suggestionType) {
  const type = Object.values(SUGGESTION_TYPES).indexOf(suggestionType)
    ? suggestionType
    : getRandomType();

  return getAlbum(type).then(album => {
    return {
      album,
      type
    };
  });
}
