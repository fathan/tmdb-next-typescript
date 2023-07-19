import api from '@/services/api';
import { AxiosResponse } from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAiringToday: async (queryParam?: string): Promise<AxiosResponse<any, any>> => {
    let uri: string = '/api/tv_series/airing_today';

    if (typeof queryParam !== 'undefined') {
      uri += queryParam
    }

    const request = await api.get(uri);

    return request;
  },
  getPopular: async (queryParam?: string): Promise<AxiosResponse<any, any>> => {
    let uri: string = '/api/tv_series/popular';

    if (typeof queryParam !== 'undefined') {
      uri += queryParam
    }

    const request = await api.get(uri);

    return request;
  },
  getTopRated: async (queryParam?: string): Promise<AxiosResponse<any, any>> => {
    let uri: string = '/api/tv_series/top_rated';

    if (typeof queryParam !== 'undefined') {
      uri += queryParam
    }

    const request = await api.get(uri);

    return request;
  },
  getDetail: async (id: number): Promise<AxiosResponse<any, any>> => {
    let uri: string = `/api/tv_series/${id}`;

    const request = await api.get(uri);

    return request;
  },
  getSearch: async (queryParam?: string): Promise<AxiosResponse<any, any>> => {
    let uri: string = '/api/tv_series/search';

    if (typeof queryParam !== 'undefined') {
      uri += queryParam
    }

    const request = await api.get(uri);

    return request;
  }
};
