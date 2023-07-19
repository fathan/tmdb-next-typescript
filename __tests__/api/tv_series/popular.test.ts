import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/tv_series/popular';

jest.mock('axios');

describe('API Route: TV Series Popular', () => {
  let req: NextApiRequest;
  let res: NextApiResponse;

  const API_URL: string = process.env.API_URL;
  const ACCESS_TOKEN: string = process.env.TMDB_ACCESS_TOKEN;
  const API_KEY: string = process.env.TMDB_API_KEY;

  beforeEach(() => {
    req = {
      method: '',
      query: {},
    } as NextApiRequest;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should be return popular', async () => {
    const mockTvSeries = [
      { id: 1, name: 'Title TV Series 1' },
      { id: 2, name: 'Title TV Series 2' },
      { id: 3, name: 'Title TV Series 3' }
    ];

    const mockResponse = {
      data: {
        results: mockTvSeries
      }
    };

    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    req.method = 'GET';

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ results: mockTvSeries });
    expect(axios.get).toHaveBeenCalledWith(
      `${API_URL}/tv/popular`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          Accept: 'application/json'
        },
        params: {
          api_key: API_KEY
        }
      }
    );
  });

  it('Should be returns error on API request failure', async () => {
    const mockError = new Error('API Error');
    (axios.get as jest.Mock).mockRejectedValueOnce(mockError);

    req.method = 'GET';

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
