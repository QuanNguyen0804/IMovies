import httpRequest from '../utils/httpRequest'

const moviesApi = {
  details: (movieId: number) => {
    const url = "/movie/";
    return httpRequest.post(url, movieId);
  },
  
  list: (movieType: string)=>{
    const url = `/movie/${movieType}`;
    return httpRequest.post(url);
  },

  similar: (movieId: number)=>{
    const url = `/movie/${movieId}/similar`
    return httpRequest.post(url);
  },

  search: (query: string, option?: object)=>{
    const url = '/search/movie'
    return httpRequest.post(url, {query, ...option});
  },

  discover: (option?: object)  =>{
    const url = '/discover/movie'
    return httpRequest.post(url, {...option});
  },

  reviews: (reviewId: string, option?: object)=>{
    const url = `/review/${reviewId}`
    return httpRequest.post(url, {...option});
  },

  genres: (option?: object)=>{
    const url = `/genre/movie/list`
    return httpRequest.post(url, {...option});
  }
};

export default moviesApi;
