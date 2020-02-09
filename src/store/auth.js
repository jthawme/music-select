import { writable } from "svelte/store";
import firebase from "../utils/firebase";
import { populateStores, subscribeData } from "./data";

export const hasResolvedLogin = writable(false);
export const isLoggedIn = writable(false);
export const userInfo = writable(null);
export const userToken = writable(null);
export const hydratedData = writable(false);

export const TOKEN_KEY = "music-select-token";

firebase.auth().onAuthStateChanged(
  user => {
    hasResolvedLogin.set(true);
    isLoggedIn.set(!!user);
    if (user) {
      userInfo.set({
        id: user.uid,
        name: user.displayName
      });

      subscribeData();

      Promise.all([
        user.getIdToken().then(accessToken => userToken.set(accessToken)),
        populateStores()
      ]).then(() => hydratedData.set(true));
    } else {
      console.log("user signed out");
    }
  },
  error => {
    console.log("auth error", error);
  }
);

userToken.subscribe(value => localStorage.setItem(TOKEN_KEY, value));
