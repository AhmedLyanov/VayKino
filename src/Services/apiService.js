import axios from "axios";

const FREE_API = "https://api1650820663.bhcesh.me/list?token=3794a7638b5863cc60d7b2b9274fa32e&sort=-views";
const FREE_API2 = "https://api.bhcesh.me/list?token=eedefb541aeba871dcfc756e6b31c02e&sort=-views";
const API_200_REQUESTS = "https://api.kinopoisk.dev/v1.4/movie/";
const API_500_REQUESTS_VERSION1 = "https://kinopoiskapiunofficial.tech/api/v2.1/films/";
const API_500_REQUESTS_VERSION2 = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
const API_FETCH_ACTOR = "https://api.kinopoisk.dev/v1.4/person/";
const API_FETCH_TO_LISTS = "https://api.kinopoisk.dev/v1.4/movie?page=1&limit=52&selectFields=id&selectFields=name&selectFields=enName&selectFields=alternativeName&selectFields=rating&selectFields=genres&selectFields=poster&sortField=rating.kp&sortType=-1&lists=";
const API_FETCH_POSTERS = "https://api.kinopoisk.dev/v1.4/movie?page=1&limit=128&selectFields=id&selectFields=name&selectFields=poster&notNullFields=name&notNullFields=poster.url&lists=planned-to-watch-films";
const API_FETCH_ACTORS = "https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&selectFields=name&selectFields=alternativeName&selectFields=persons&notNullFields=persons.id&notNullFields=persons.name&notNullFields=persons.photo&notNullFields=persons.description&notNullFields=persons.profession&notNullFields=persons.enProfession&id=";
const API_200_REQUESTS_TOKEN = "5W6J03Z-ZNT4Y0V-MC7SVYX-WQS4ZEN";
const API_200_REQUESTS_TOKEN2 = "25VQB0J-Y1ZMMET-GPVV75G-1R3Q8BZ";
const API_200_REQUESTS_TOKEN3 = "RP2WK9M-GCAMZCQ-JTDB83C-9S0QAQ1";
const API_500_REQUESTS_TOKEN = "8e7d5861-a08e-425e-87a4-491474e5ce78";
const API_YOUTUBE_TOKEN = "7c902ac83amshbb53ec6e3e93e16p1f2ea5jsnbd7787c7c777";
const blackList = JSON.parse(localStorage.getItem("kinoareaBlackList"));

export const fetchFreeAPI = async (dopparams = "") => {
    try {
        const response = await axios.get(`${FREE_API}${dopparams}`);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const fetchFreeAPI2 = async (dopparams = "") => {
    try {
        const response = await axios.get(`${FREE_API2}${dopparams}`);
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
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const fetchAwards = async (id) => {
    try {
        const response = await axios.get(`${API_500_REQUESTS_VERSION2}${id}/awards`, {
            headers: {
                Accept: "application/json",
                "X-API-KEY": API_500_REQUESTS_TOKEN,
            },
        });
        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching awards:", error);
        throw error;
    }
};

export const fetchPosters = async (id) => {
    try {
        const response = await axios.get(`${API_500_REQUESTS_VERSION2}${id}/images?type=POSTER&page=1`, {
            headers: {
                Accept: "application/json",
                "X-API-KEY": API_500_REQUESTS_TOKEN,
            },
        });
        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching posters:", error);
        throw error;
    }
};

export const fetchPreviews = async (id) => {
    try {
        const response = await axios.get(`${API_500_REQUESTS_VERSION2}${id}/reviews?page=1&order=DATE_DESC`, {
            headers: {
                Accept: "application/json",
                "X-API-KEY": API_500_REQUESTS_TOKEN,
            },
        });
        if (response.status !== 200) {
            console.log(`Ошибка:`, response);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.data.items || [];
    } catch (error) {
        console.error("Error fetching previews:", error);
        throw error;
    }
};

export const fetchStills = async (id) => {
    try {
        const response = await axios.get(`${API_500_REQUESTS_VERSION2}${id}/images?type=STILL&page=1`, {
            headers: {
                Accept: "application/json",
                "X-API-KEY": API_500_REQUESTS_TOKEN,
            },
        });
        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching stills:", error);
        throw error;
    }
};

export const fetchSequels = async (id) => {
    try {
        const response = await axios.get(`${API_500_REQUESTS_VERSION1}${id}/sequels_and_prequels`, {
            headers: {
                Accept: "application/json",
                "X-API-KEY": API_500_REQUESTS_TOKEN,
            },
        });
        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching sequels:", error);
        throw error;
    }
};

export const fetchSimilars = async (id) => {
    try {
        const response = await axios.get(`${API_500_REQUESTS_VERSION2}${id}/similars`, {
            headers: {
                Accept: "application/json",
                "X-API-KEY": API_500_REQUESTS_TOKEN,
            },
        });
        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching similars:", error);
        throw error;
    }
};

export const searchTrailer = async (movieTitle) => {
    const query = `${movieTitle} официальный трейлер на русском`;
    const url = `https://yt-api.p.rapidapi.com/search?query=${encodeURIComponent(query)}`;
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
        if (data.data && data.data.length > 0) {
            const preferredChannelIds = [
                "UCDgVWEC93NuidEeDxWHAIFg",
                "UC6A-Z0jDKemh9-CwGbj5yog",
                "UCh9gYjgnUB1BRY0-LYJXKRg",
                "UCs9tHGGpNjOMiCnbqTGA1PQ",
                "UCJSrnFU1ILHyhJ4Oe9GayGw",
            ];
            const preferedVideo = data.data.find((item) => preferredChannelIds.includes(item.channelId));
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
        return data.data.slice(0, 10);
    } catch (error) {
        console.error("Error fetching videos:", error);
        return [];
    }
};

export const fetchFilmsByGenre = async (genre, dopparams = "") => {
    try {
        const response = await axios.get(`${FREE_API}&limit=90&type=film${dopparams}`);
        if (!response.data || !response.data.results) {
            console.warn("No results found from API.");
            return [];
        }
        if (genre.toLowerCase() !== "все") {
            const lowerCaseGenre = genre.toLowerCase();
            let filteredFilms = response.data.results.filter(element => {
                const genres = Object.values(element.genre);
                return genres.some(g => g.toLowerCase() === lowerCaseGenre);
            });
            filteredFilms = filteredFilms.filter(obj => !blackList.includes(obj.name));
            return filteredFilms.slice(0, 10);
        } else {
            let a = response.data.results.filter(obj => !blackList.includes(obj.name)).slice(0, 10);
            return a;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const fetchMovieToId = async (id) => {
    try {
        const response = await axios.get(`${FREE_API}&kinopoisk_id=${id}`);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const fetchActor = async (id) => {
    try {
        const response = await axios.get(`${API_FETCH_ACTOR}${id}`, {
            headers: {
                Accept: "application/json",
                "X-API-KEY": API_200_REQUESTS_TOKEN2,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const fetchMoviesToList = async (list) => {
    try {
        const response = await axios.get(`${API_FETCH_TO_LISTS}${list}`, {
            headers: {
                Accept: "application/json",
                "X-API-KEY": API_200_REQUESTS_TOKEN2,
            },
        });
        return response.data.docs;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const fetchLatestPosters = async () => {
    try {
        const response = await axios.get(`${API_FETCH_POSTERS}`, {
            headers: {
                Accept: "application/json",
                "X-API-KEY": API_200_REQUESTS_TOKEN2,
            },
        });
        return response.data.docs;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const fetchActors = async (id) => {
    try {
        const response = await axios.get(`${API_FETCH_ACTORS}${id}`, {
            headers: {
                Accept: "application/json",
                "X-API-KEY": API_200_REQUESTS_TOKEN3,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};