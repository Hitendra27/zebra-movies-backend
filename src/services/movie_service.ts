export interface MovieResponse {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}
export interface MovieWithGenreResponse {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
}

const API_URL = `${process.env.BASE_URL}discover/movie?sort_by=popularity.desc&api_key=${process.env.API_KEY}&page=1`;

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzJhNDJlYjU3YTVjM2Y5Y2U4Y2U1YmY4M2U1NjIwMSIsInN1YiI6IjY0Y2JiZWU1Nzg1NzBlMDExZTUzZjZhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bSkIGEeiWScqFM0nIyIPqBzyM1A1EgtGpz0xJ0akZgc",
  },
};

export const getMovies = async (): Promise<MovieResponse[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Bad response");
    }
    const data = await response.json();
    const filteredMovies: MovieResponse[] = data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
    }));
    return filteredMovies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("An error occurred while fetching movies");
  }
};

export const searchByString = async ({ query = "" }: { query: string }) => {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&api_key=${process.env.API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const searchMovieResults: MovieWithGenreResponse[] = data.results.map(
      (movie: any) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        genre_ids: movie.genre_ids,
      })
    );
    return searchMovieResults;
  } catch (error) {
    console.error("Error fetching search by string:", error);
    return null;
  }
};

export const filterByGenres = async ({ genres = "" }: { genres: string }) => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-GB&with_genres=${genres}&api_key=${process.env.API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const genreFilterResults: MovieResponse[] = data.results.map(
      (movie: any) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
      })
    );
    return genreFilterResults;
  } catch (error) {
    console.error("Error fetching filter by genre:", error);
    return null;
  }
};

export const getGenres = async () => {
  try {
    const url = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
    const response = await fetch(url, options);
    const genreResults = await response.json();
    return genreResults;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getHealth = async () => {
  try {
    const url = `https://api.themoviedb.org/3/`;
    const response = await fetch(url, options);
    const healthResults = await response.json();
    return healthResults;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getLatest = async () => {
  try {
    const url = `${process.env.BASE_URL}movie/now_playing?api_key=${process.env.API_KEY}&page=1`;
    const response = await fetch(url, options);
    const latestResults = await response.json();
    return latestResults;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUpcomingMovies = async () => {
  try {
    const url = `${process.env.BASE_URL}movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1&region=US`;
    const response = await fetch(url, options);
    const upcomingMoviesResults = await response.json();
    return upcomingMoviesResults;
  } catch (error) {
    console.log(error);
    return null;
  }
};
