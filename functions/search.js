import * as admin from "firebase-admin";
import { searchAlbum } from "./src/lastfm";
import { RESPONSES, getToken } from "./config/constants";

import serviceAccount from "./config/serviceAccount.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://music-select-6b777.firebaseio.com"
});

export async function handler(event, context) {
  const idToken = getToken(event.headers.authorization);

  if (!idToken) {
    return RESPONSES.NOT_LOGGED_IN;
  }

  const decodedToken = await admin.auth().verifyIdToken(idToken);

  if (!decodedToken) {
    return RESPONSES.NOT_LOGGED_IN;
  }

  const albumName = event.queryStringParameters.album;

  try {
    const data = await searchAlbum(albumName);

    return {
      statusCode: 200,
      body: JSON.stringify(data.results.albummatches.album)
    };
  } catch (e) {
    return RESPONSES.GENERIC;
  }
}
