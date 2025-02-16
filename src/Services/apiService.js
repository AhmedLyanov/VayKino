import axios from "axios";

const FREE_API =
  "https://api1650820663.bhcesh.me/list?token=3794a7638b5863cc60d7b2b9274fa32e&sort=-views";
const API_200_REQUESTS = "https://api.kinopoisk.dev/v1.4/movie/";
const API_500_REQUESTS_VERSION1 =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/";
const API_500_REQUESTS_VERSION2 =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

const API_200_REQUESTS_TOKEN = "5W6J03Z-ZNT4Y0V-MC7SVYX-WQS4ZEN";
const API_500_REQUESTS_TOKEN = "f541243d-43ef-4e4e-a710-9d6a2eb02f26";
const API_YOUTUBE_TOKEN = "7c902ac83amshbb53ec6e3e93e16p1f2ea5jsnbd7787c7c777";

export const fetchFreeAPI = async (dopparams = "") => {
  try {
    const response = await axios.get(`${FREE_API}${dopparams}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchData = async (id) => {
  try {
    const response = await axios.get(`${API_200_REQUESTS}${id}`, {
      headers: {
        Accept: "application/json",
        "X-API-KEY": API_200_REQUESTS_TOKEN,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchAwards = async (id) => {
  try {
    const response = await axios.get(
      `${API_500_REQUESTS_VERSION2}${id}/awards`,
      {
        headers: {
          Accept: "application/json",
          "X-API-KEY": API_500_REQUESTS_TOKEN,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching awards:", error);
    throw error;
  }
};

export const fetchPosters = async (id) => {
  try {
    const response = await axios.get(
      `${API_500_REQUESTS_VERSION2}${id}/images?type=POSTER&page=1`,
      {
        headers: {
          Accept: "application/json",
          "X-API-KEY": API_500_REQUESTS_TOKEN,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posters:", error);
    throw error;
  }
};

export const fetchStills = async (id) => {
  try {
    const response = await axios.get(
      `${API_500_REQUESTS_VERSION2}${id}/images?type=STILL&page=1`,
      {
        headers: {
          Accept: "application/json",
          "X-API-KEY": API_500_REQUESTS_TOKEN,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching stills:", error);
    throw error;
  }
};

export const fetchSequels = async (id) => {
  try {
    const response = await axios.get(
      `${API_500_REQUESTS_VERSION1}${id}/sequels_and_prequels`,
      {
        headers: {
          Accept: "application/json",
          "X-API-KEY": API_500_REQUESTS_TOKEN,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching sequels:", error);
    throw error;
  }
};

export const fetchSimilars = async (id) => {
  try {
    const response = await axios.get(
      `${API_500_REQUESTS_VERSION2}${id}/similars`,
      {
        headers: {
          Accept: "application/json",
          "X-API-KEY": API_500_REQUESTS_TOKEN,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching similars:", error);
    throw error;
  }
};

export const searchTrailer = async (movieTitle) => {
  const query = `${movieTitle} официальный трейлер на русском`;
  const url = `https://yt-api.p.rapidapi.com/search?query=${encodeURIComponent(
    query
  )}`;

  const options = {
    method: "GET",
    url: url,
    headers: {
      "x-rapidapi-key": API_YOUTUBE_TOKEN,
      "x-rapidapi-host": "yt-api.p.rapidapi.com",
    },
  };

  try {
    const response = await axios(options);

    if (response.status !== 200) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = response.data;
    console.log(data);

    if (data.data && data.data.length > 0) {
      const preferredChannelIds = [
        "UCDgVWEC93NuidEeDxWHAIFg",
        "UC6A-Z0jDKemh9-CwGbj5yog",
        "UCh9gYjgnUB1BRY0-LYJXKRg",
        "UCs9tHGGpNjOMiCnbqTGA1PQ",
        "UCJSrnFU1ILHyhJ4Oe9GayGw",
      ];

      const preferedVideo = data.data.find((item) =>
        preferredChannelIds.includes(item.channelId)
      );

      console.log(preferedVideo || data.data[0]);
      return preferedVideo || data.data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Ошибка:", error.message);
    return null;
  }
};

export const getLatestVideosFromChannel = async () => {
  const url = `https://yt-api.p.rapidapi.com/channel/videos?id=${encodeURIComponent("UC6A-Z0jDKemh9-CwGbj5yog")}`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_YOUTUBE_TOKEN,
      'x-rapidapi-host': 'yt-api.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return data.data.slice(0, 10)
    
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}