import api from '@/services/api';
import { AxiosResponse } from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getNowPlaying: async (queryParam?: string): Promise<AxiosResponse<any, any>> => {
    let uri: string = '/api/movies/now_playing';

    if (typeof queryParam !== 'undefined') {
      uri += queryParam
    }

    const request = await api.get(uri);

    return request;
  },
  getUpcoming: async (queryParam?: string): Promise<AxiosResponse<any, any>> => {
    let uri: string = '/api/movies/upcoming';

    if (typeof queryParam !== 'undefined') {
      uri += queryParam
    }

    const request = await api.get(uri);

    return request;
  },
  getTopRated: async (queryParam?: string): Promise<AxiosResponse<any, any>> => {
    let uri: string = '/api/movies/top_rated';

    if (typeof queryParam !== 'undefined') {
      uri += queryParam
    }

    const request = await api.get(uri);

    return request;
  },
  getDetail: async (id: number): Promise<AxiosResponse<any, any>> => {
    let uri: string = `/api/movies/${id}`;

    const request = await api.get(uri);

    return request;
  },
  getSearch: async (queryParam?: string): Promise<AxiosResponse<any, any>> => {
    let uri: string = '/api/movies/search';

    if (typeof queryParam !== 'undefined') {
      uri += queryParam
    }

    const request = await api.get(uri);

    return request;
  }
};
