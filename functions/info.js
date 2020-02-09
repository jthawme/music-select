import { getAlbumInfo } from "./src/lastfm";
import { RESPONSES } from "./config/constants";
import { loggedInRoute } from "./config/utils";

export async function handler(event, context) {
  // const { error } = await loggedInRoute(event);

  // if (error) {
  //   return error;
  // }

  const albumMbid = event.queryStringParameters.mbid;
  const artist = event.queryStringParameters.artist;
  const album = event.queryStringParameters.album;

  try {
    const data = await getAlbumInfo(albumMbid, artist, album);

    if (data.error) {
      return RESPONSES.NO_ALBUM;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data.album)
    };
  } catch (e) {
    return RESPONSES.GENERIC;
  }
}
