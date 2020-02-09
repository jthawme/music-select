import { searchAlbum } from "./src/lastfm";
import { RESPONSES } from "./config/constants";
import { loggedInRoute } from "./config/utils";

export async function handler(event, context) {
  const { error } = await loggedInRoute(event);

  if (error) {
    return error;
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
