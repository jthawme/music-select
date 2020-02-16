import { writable, get } from "svelte/store";
import firebase from "../utils/firebase";
import { listenTo } from "./data";

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
        name: user.displayName,
        image: user.photoURL
      });

      if (!get(hydratedData)) {
        Promise.all([
          user.getIdToken().then(accessToken => userToken.set(accessToken))
        ]).then(() => {
          hydratedData.set(true);
          listenTo("albums");
          listenTo("genres");
          listenTo("info");
        });
      }
    } else {
      console.log("user signed out");
    }
  },
  error => {
    console.log("auth error", error);
  }
);

userToken.subscribe(value => localStorage.setItem(TOKEN_KEY, value));
